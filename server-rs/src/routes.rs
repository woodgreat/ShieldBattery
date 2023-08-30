use std::sync::Arc;
use std::time::Duration;

use async_graphql::dataloader::DataLoader;
use async_graphql::extensions::Tracing;
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig, ALL_WEBSOCKET_PROTOCOLS};
use async_graphql_axum::{GraphQLProtocol, GraphQLRequest, GraphQLResponse, GraphQLWebSocket};
use axum::body::Body;
use axum::error_handling::HandleErrorLayer;
use axum::extract::WebSocketUpgrade;
use axum::http::header::CONTENT_TYPE;
use axum::http::{header, HeaderName, Request, StatusCode};
use axum::middleware::Next;
use axum::response::{Html, IntoResponse, Response};
use axum::routing::get;
use axum::{middleware, Extension, Router};
use axum_client_ip::{SecureClientIp, SecureClientIpSource};
use axum_prometheus::PrometheusMetricLayer;
use sqlx::PgPool;
use tower::{BoxError, ServiceBuilder};
use tower_http::classify::ServerErrorsFailureClass;
use tower_http::compression::CompressionLayer;
use tower_http::cors;
use tower_http::request_id::MakeRequestUuid;
use tower_http::sensitive_headers::{
    SetSensitiveRequestHeadersLayer, SetSensitiveResponseHeadersLayer,
};
use tower_http::trace::TraceLayer;
use tower_http::ServiceBuilderExt;
use tracing::Span;

use crate::configuration::{Env, Settings};
use crate::email::MailgunClient;
use crate::redis::RedisPool;
use crate::schema::{build_schema, SbSchema};
use crate::sessions::SbSession;
use crate::users::UsersLoader;

async fn health_check() -> impl IntoResponse {
    "OK"
}

async fn graphql_playground() -> impl IntoResponse {
    Html(playground_source(
        GraphQLPlaygroundConfig::new("/gql").subscription_endpoint("/gql/ws"),
    ))
}

async fn send_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "Not Found")
}

async fn graphql_handler(
    ip: SecureClientIp,
    session: SbSession,
    schema: Extension<SbSchema>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    schema
        .execute(req.into_inner().data(ip).data(session))
        .await
        .into()
}

async fn graphql_ws_handler(
    Extension(schema): Extension<SbSchema>,
    protocol: GraphQLProtocol,
    websocket: WebSocketUpgrade,
) -> Response {
    websocket
        .protocols(ALL_WEBSOCKET_PROTOCOLS)
        .on_upgrade(move |stream| {
            // TODO(tec27): Implement on_connection_init that grabs the session (might be passed
            // over the websocket rather than grabbed from headers? unsure)
            GraphQLWebSocket::new(stream, schema.clone(), protocol).serve()
        })
}

async fn handle_errors(
    Extension(settings): Extension<Settings>,
    error: BoxError,
) -> (StatusCode, String) {
    if error.is::<tower::timeout::error::Elapsed>() {
        (StatusCode::REQUEST_TIMEOUT, "Request Timeout".to_string())
    } else {
        tracing::error!("Unhandled internal error: {error:?}");
        if settings.env == Env::Production {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Internal Server Error".to_string(),
            )
        } else {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Internal Server Error: {error:?}"),
            )
        }
    }
}

async fn only_unforwarded_clients<B>(request: Request<B>, next: Next<B>) -> Response {
    if request
        .headers()
        .get(HeaderName::from_static("x-real-ip"))
        .is_some()
    {
        (StatusCode::NOT_FOUND, "Not Found").into_response()
    } else {
        next.run(request).await
    }
}

pub fn create_app(db_pool: PgPool, redis_pool: RedisPool, settings: Settings) -> Router {
    let mailgun = Arc::new(MailgunClient::new(
        settings.mailgun.clone(),
        settings.canonical_host.clone(),
    ));

    let ip_source = if settings.reverse_proxied {
        SecureClientIpSource::XRealIp
    } else {
        SecureClientIpSource::ConnectInfo
    };

    let schema = build_schema()
        .extension(Tracing)
        .data(settings.clone())
        .data(db_pool.clone())
        .data(redis_pool.clone())
        .data(mailgun.clone())
        .data(DataLoader::new(
            UsersLoader::new(db_pool.clone()),
            tokio::spawn,
        ))
        .finish();

    let sensitive_headers: Arc<[_]> = Arc::new([
        header::AUTHORIZATION,
        header::PROXY_AUTHORIZATION,
        header::COOKIE,
        header::SET_COOKIE,
        HeaderName::from_static("sb-session-id"),
    ]);

    let playground_route = if settings.env == Env::Production {
        get(send_404)
    } else {
        get(graphql_playground)
    };

    let (prometheus_layer, metric_handle) = PrometheusMetricLayer::pair();

    let metrics_router = Router::new()
        .route("/", get(|| async move { metric_handle.render() }))
        .layer(middleware::from_fn(only_unforwarded_clients));

    Router::new()
        .route("/healthcheck", get(health_check))
        .route("/gql", playground_route.post(graphql_handler))
        .route("/gql/ws", get(graphql_ws_handler))
        .layer(
            ServiceBuilder::new()
                .layer(prometheus_layer)
                .layer(SetSensitiveRequestHeadersLayer::from_shared(Arc::clone(
                    &sensitive_headers,
                )))
                .set_x_request_id(MakeRequestUuid)
                .layer(Extension(settings))
                .layer(ip_source.into_extension())
                .layer(
                    TraceLayer::new_for_http()
                        .make_span_with(|request: &Request<Body>| {
                            let span = tracing::info_span!(
                                "request",
                                req.method = %request.method(),
                                req.url = %request.uri(),
                                req.id = tracing::field::Empty,
                                req.userAgent = tracing::field::Empty,
                                req.headers = ?request.headers(),
                                req.ip = tracing::field::Empty,
                                res.statusCode = tracing::field::Empty,
                                res.responseTime = tracing::field::Empty,
                                res.headers = tracing::field::Empty,
                                error = tracing::field::Empty,
                                errorMessage = tracing::field::Empty,
                            );

                            request
                                .headers()
                                .get(HeaderName::from_static("x-request-id"))
                                .map(|v| v.to_str().map(|v| span.record("req.id", v)));
                            request
                                .headers()
                                .get(header::USER_AGENT)
                                .map(|v| v.to_str().map(|v| span.record("req.userAgent", v)));
                            // TODO(tec27): Ideally this would come from our IP source, but
                            // extracting it is async and we can't easily make use of that here, so
                            // it'll take some more figuring out to make work
                            request
                                .headers()
                                .get(HeaderName::from_static("x-real-ip"))
                                .map(|v| v.to_str().map(|v| span.record("req.ip", v)));

                            span
                        })
                        .on_response(|response: &Response<_>, latency: Duration, span: &Span| {
                            span.record("res.statusCode", response.status().as_u16());
                            span.record("res.responseTime", latency.as_millis());
                            span.record("res.headers", &tracing::field::debug(response.headers()));

                            tracing::info!("request completed");
                        })
                        .on_failure(
                            |error: ServerErrorsFailureClass, latency: Duration, span: &Span| {
                                span.record("errorMessage", &error.to_string());
                                span.record("res.responseTime", latency.as_millis());
                                tracing::error!(error = error.to_string(), "request failed");
                            },
                        ),
                )
                .layer(HandleErrorLayer::new(handle_errors))
                .timeout(Duration::from_secs(10))
                .layer(CompressionLayer::new().no_br())
                .layer(
                    cors::CorsLayer::new()
                        .allow_origin(cors::Any)
                        .allow_headers([CONTENT_TYPE, HeaderName::from_static("sb-session-id")])
                        .allow_methods(cors::Any)
                        .max_age(Duration::from_secs(60 * 60 * 24)),
                )
                .layer(SetSensitiveResponseHeadersLayer::from_shared(
                    sensitive_headers,
                ))
                .propagate_x_request_id()
                .layer(Extension(schema))
                .layer(Extension(db_pool))
                .layer(Extension(redis_pool))
                .layer(Extension(mailgun))
                .into_inner(),
        )
        .nest("/metrics", metrics_router)
}
