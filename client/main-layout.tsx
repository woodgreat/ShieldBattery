import { Immutable } from 'immer'
import keycode from 'keycode'
import { rgba } from 'polished'
import React, { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Route, Switch } from 'wouter'
import { NEWS_PAGE } from '../common/flags'
import { MapInfoJson } from '../common/maps'
import { EMAIL_VERIFICATION_ID, NotificationType } from '../common/notifications'
import { ReduxAction } from './action-types'
import { openOverlay } from './activities/action-creators'
import ActivityBar from './activities/activity-bar'
import { ActivityButton } from './activities/activity-button'
import { ActivityOverlay } from './activities/activity-overlay'
import { ActivityOverlayType } from './activities/activity-overlay-type'
import { VersionText } from './activities/version-text'
import { useIsAdmin } from './admin/admin-permissions'
import { openChangelogIfNecessary } from './changelog/action-creators'
import { ChannelRouteComponent } from './chat/route'
import { openDialog } from './dialogs/action-creators'
import { DialogType } from './dialogs/dialog-type'
import { DispatchFunction } from './dispatch-registry'
import { FileDropZone } from './file-browser/file-drop-zone'
import { GamesRouteComponent } from './games/route'
import { Home } from './home'
import { MaterialIcon } from './icons/material/material-icon'
import FindMatchIcon from './icons/shieldbattery/ic_satellite_dish_black_36px.svg'
import { useKeyListener } from './keyboard/key-listener'
import { navigateToLadder } from './ladder/action-creators'
import { LadderRouteComponent } from './ladder/ladder'
import { navigateToLeaguesList } from './leagues/action-creators'
import { LeagueRoot } from './leagues/league-list'
import { LobbyView } from './lobbies/view'
import { regenMapImage, removeMap } from './maps/action-creators'
import { cancelFindMatch } from './matchmaking/action-creators'
import { MatchmakingSearchingOverlay } from './matchmaking/matchmaking-searching-overlay'
import MatchmakingView from './matchmaking/view'
import { IconButton, useButtonHotkey } from './material/button'
import Card from './material/card'
import { usePopoverController } from './material/popover'
import { shadowDef8dp } from './material/shadow-constants'
import { Tooltip } from './material/tooltip'
import { ConnectedLeftNav } from './navigation/connected-left-nav'
import { GoToIndex } from './navigation/index'
import { replace } from './navigation/routing'
import { addLocalNotification } from './notifications/action-creators'
import { NotificationsButton } from './notifications/activity-bar-entry'
import NotificationPopups from './notifications/notifications-popup'
import { PartyView } from './parties/party-view'
import {
  addAcceptableUseNotificationIfNeeded,
  addPrivacyPolicyNotificationIfNeeded,
  addTermsOfServiceNotificationIfNeeded,
} from './policies/action-creators'
import LoadingIndicator from './progress/dots'
import { useAppDispatch, useAppSelector } from './redux-hooks'
import { showReplayInfo } from './replays/action-creators'
import { openSettings } from './settings/action-creators'
import { isShieldBatteryHealthy, isStarcraftHealthy } from './starcraft/is-starcraft-healthy'
import { StarcraftStatus } from './starcraft/starcraft-reducer'
import { useStableCallback } from './state-hooks'
import { amberA400, colorTextSecondary, dialogScrim } from './styles/colors'
import { FlexSpacer } from './styles/flex-spacer'
import { Subtitle1 } from './styles/typography'
import { FriendsListActivityButton } from './users/friends-list'
import { ProfileRouteComponent } from './users/route'
import { WhisperRouteComponent } from './whispers/route'

const ALT_B = { keyCode: keycode('b'), altKey: true }
const ALT_C = { keyCode: keycode('c'), altKey: true }
const ALT_D = { keyCode: keycode('d'), altKey: true }
const ALT_F = { keyCode: keycode('f'), altKey: true }
const ALT_G = { keyCode: keycode('g'), altKey: true }
const ALT_J = { keyCode: keycode('j'), altKey: true }
const ALT_M = { keyCode: keycode('m'), altKey: true }
const ALT_O = { keyCode: keycode('o'), altKey: true }
const ALT_R = { keyCode: keycode('r'), altKey: true }
const ALT_S = { keyCode: keycode('s'), altKey: true }

const Container = styled.div`
  display: flex;
  overflow: hidden;
`

const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: hidden;
`

let lobbyRoute = <></>
let matchmakingRoute = <></>
let partyRoute = <></>
if (IS_ELECTRON) {
  // TODO(2Pac): Remove `any` once the `LobbyView` is TS-ified
  lobbyRoute = <Route path='/lobbies/:lobby/:rest*' component={LobbyView} />
  matchmakingRoute = <Route path='/matchmaking/:rest*' component={MatchmakingView} />
  partyRoute = <Route path='/parties/:partyId/:rest*' component={PartyView} />
}

const AdminPanelComponent = React.lazy(() => import('./admin/panel'))

function LoadableAdminPanel() {
  // TODO(tec27): do we need to position this indicator differently? (or pull that into a common
  // place?)
  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <AdminPanelComponent />
    </React.Suspense>
  )
}

const MiniActivityButtonsContainer = styled.div`
  width: 100%;
  display: flex;

  flex-wrap: wrap-reverse;
  justify-content: center;
`

/**
 * Tracks if this is the first time this user has logged in on this client. Pretty dumb, if we need
 * more smarts we can add it as a Context var or put it in the store or something.
 */
let firstLoggedIn = true

/**
 * Calls the specified callback only if the StarCraft and ShieldBattery installations are "healthy".
 *
 * The deps argument here won't be linted so you should ensure that it's a complete list.
 */
function useHealthyStarcraftCallback<T extends (...args: any[]) => any>(
  dispatch: DispatchFunction<ReduxAction>,
  starcraft: StarcraftStatus,
  callback: T,
  deps: any[] = [],
) {
  return useCallback(
    (...args: Parameters<T>) => {
      if (!isShieldBatteryHealthy({ starcraft })) {
        dispatch(openDialog({ type: DialogType.ShieldBatteryHealth }))
      } else if (!isStarcraftHealthy({ starcraft })) {
        dispatch(openDialog({ type: DialogType.StarcraftHealth }))
      } else {
        callback(...args)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, starcraft, callback, ...deps],
  )
}

const StyledFileDropZone = styled(FileDropZone)`
  position: absolute;
  inset: 0;
`

const FileDropContents = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${rgba(dialogScrim, 0.42)};
  pointer-events: none;
`

const FileDropCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  aspect-ratio: 16 / 9;
  padding-bottom: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  border: 4px dashed ${rgba(amberA400, 0.7)};
  border-radius: 16px;
  box-shadow: ${shadowDef8dp};
  contain: paint;

  color: ${colorTextSecondary};
  text-align: center;
`

function GlobalDropZone() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onFilesDropped = useStableCallback((files: File[]) => {
    // TODO(tec27): Support multiple replay files being dropped at once: create a playlist/watch
    // them in succession
    const file = files[0]
    dispatch(showReplayInfo(file.path))
  })

  return (
    <StyledFileDropZone extensions={['rep']} onFilesDropped={onFilesDropped}>
      <FileDropContents>
        <FileDropCard>
          <MaterialIcon icon='file_open' size={80} />
          <Subtitle1>
            {t('replays.fileDropText', 'Drop replays here to watch them with ShieldBattery.')}
          </Subtitle1>
        </FileDropCard>
      </FileDropContents>
    </StyledFileDropZone>
  )
}

export function MainLayout() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isAdmin = useIsAdmin()
  const inGameplayActivity = useAppSelector(s => s.gameplayActivity.inGameplayActivity)
  const isEmailVerified = useAppSelector(s => s.auth.self!.user.emailVerified)
  const isMatchmakingSearching = useAppSelector(s => !!s.matchmaking.searchInfo)
  const lobbyCount = useAppSelector(s => s.lobbyList.count)
  const starcraft = useAppSelector(s => s.starcraft)

  const [searchingMatchOverlayOpen, openSearchingMatchOverlay, closeSearchingMatchOverlay] =
    usePopoverController(false)
  const searchingMatchButtonRef = useRef<HTMLButtonElement>(null)

  const settingsButtonRef = useRef<HTMLButtonElement>(null)
  useButtonHotkey({ ref: settingsButtonRef, hotkey: ALT_S })

  useEffect(() => {
    dispatch(openChangelogIfNecessary())

    if (firstLoggedIn) {
      firstLoggedIn = false
      if (!isEmailVerified) {
        dispatch(
          addLocalNotification({
            id: EMAIL_VERIFICATION_ID,
            type: NotificationType.EmailVerification,
          }),
        )
      }

      dispatch(addPrivacyPolicyNotificationIfNeeded())
      dispatch(addTermsOfServiceNotificationIfNeeded())
      dispatch(addAcceptableUseNotificationIfNeeded())
    }

    return () => {
      firstLoggedIn = true
    }
  }, [isEmailVerified, dispatch])

  const onFindMatchClick = useHealthyStarcraftCallback(dispatch, starcraft, () => {
    dispatch(openOverlay({ type: ActivityOverlayType.FindMatch }))
  })

  const onLobbiesClick = useHealthyStarcraftCallback(dispatch, starcraft, () => {
    dispatch(openOverlay({ type: ActivityOverlayType.Lobby }))
  })
  // This reproduces the hotkeys we had for creating/joining a lobby before we combined the buttons
  useKeyListener({
    onKeyDown: (event: KeyboardEvent) => {
      if (!IS_ELECTRON) {
        return false
      }

      if (event.keyCode === ALT_C.keyCode && event.altKey) {
        dispatch(openOverlay({ type: ActivityOverlayType.Lobby, initData: { creating: true } }))
        return true
      } else if (event.keyCode === ALT_J.keyCode && event.altKey) {
        dispatch(openOverlay({ type: ActivityOverlayType.Lobby }))
        return true
      }

      return false
    },
  })

  const onMapDetails = useCallback(
    (map: Immutable<MapInfoJson>) => {
      dispatch(openDialog({ type: DialogType.MapDetails, initData: { mapId: map.id } }))
    },
    [dispatch],
  )

  const onRemoveMap = useCallback(
    (map: Immutable<MapInfoJson>) => {
      dispatch(removeMap(map))
    },
    [dispatch],
  )

  const onRegenMapImage = useCallback(
    (map: Immutable<MapInfoJson>) => {
      dispatch(regenMapImage(map))
    },
    [dispatch],
  )

  const onMapUpload = useCallback(
    (map: Immutable<MapInfoJson>) => {
      // TODO(tec27): This leads to a weird activity stack (typically, [Server, Local, Server]),
      // would probably be better to just pop the activity stack up to the first Server activity? Or
      // just restructure this to not have separate activities for these things
      dispatch(
        openOverlay({
          type: ActivityOverlayType.BrowseServerMaps,
          initData: {
            uploadedMap: map,
            title: t('maps.activity.title', 'Maps'),
            onMapUpload,
            onMapSelect: onMapDetails,
            onMapDetails,
            onRemoveMap,
            onRegenMapImage,
          },
        }),
      )
    },
    [dispatch, onMapDetails, onRegenMapImage, onRemoveMap, t],
  )

  // TODO(tec27): Figure out why the hell this requires a valid starcraft installation and then fix
  // that and remove this requirement
  const onMapsClick = useHealthyStarcraftCallback(
    dispatch,
    starcraft,
    () => {
      dispatch(
        openOverlay({
          type: ActivityOverlayType.BrowseServerMaps,
          initData: {
            title: t('maps.activity.title', 'Maps'),
            onMapUpload,
            onMapSelect: onMapDetails,
            onMapDetails,
            onRemoveMap,
            onRegenMapImage,
          },
        }),
      )
    },
    [onMapDetails, onMapUpload, onRegenMapImage, onRemoveMap],
  )

  const onReplaysClick = useCallback(() => {
    if (!isShieldBatteryHealthy({ starcraft })) {
      dispatch(openDialog({ type: DialogType.ShieldBatteryHealth }))
    } else if (!isStarcraftHealthy({ starcraft })) {
      dispatch(openDialog({ type: DialogType.StarcraftHealth }))
    } else {
      dispatch(openOverlay({ type: ActivityOverlayType.BrowseLocalReplays }))
    }
  }, [dispatch, starcraft])

  const findMatchButton = !isMatchmakingSearching ? (
    <ActivityButton
      key='find-match'
      icon={<FindMatchIcon />}
      label={t('matchmaking.activity.findMatch', 'Find match')}
      onClick={onFindMatchClick}
      disabled={inGameplayActivity}
      hotkey={ALT_F}
    />
  ) : (
    <ActivityButton
      key='searching-match'
      ref={searchingMatchButtonRef}
      icon={<FindMatchIcon />}
      glowing={true}
      label={t('matchmaking.activity.finding', 'Finding…')}
      onClick={openSearchingMatchOverlay}
      hotkey={ALT_F}
    />
  )
  const activityButtons = IS_ELECTRON
    ? [
        findMatchButton,
        <ActivityButton
          key='lobbies'
          icon={<MaterialIcon icon='holiday_village' size={36} />}
          label={t('lobbies.activity.title', 'Lobbies')}
          onClick={onLobbiesClick}
          hotkey={ALT_B}
          count={lobbyCount > 0 ? lobbyCount : undefined}
        />,
        <ActivityButton
          key='maps'
          icon={<MaterialIcon icon='map' size={36} />}
          label={t('maps.activity.title', 'Maps')}
          onClick={onMapsClick}
          hotkey={ALT_M}
        />,
        <ActivityButton
          key='replays'
          icon={<MaterialIcon icon='movie' size={36} />}
          label={t('replays.activity.title', 'Replays')}
          onClick={onReplaysClick}
          hotkey={ALT_R}
        />,
        <ActivityButton
          key='ladder'
          icon={<MaterialIcon icon='military_tech' size={36} />}
          label={t('ladder.activity.title', 'Ladder')}
          onClick={() => navigateToLadder()}
          hotkey={ALT_D}
        />,
        <ActivityButton
          key='leagues'
          icon={<MaterialIcon icon='social_leaderboard' size={36} />}
          label={t('leagues.activity.title', 'Leagues')}
          onClick={() => navigateToLeaguesList()}
          hotkey={ALT_G}
        />,
        <FlexSpacer key='spacer' />,
      ]
    : [
        <ActivityButton
          key='download'
          icon={<MaterialIcon icon='download' size={36} />}
          label={t('common.actions.download', 'Download')}
          onClick={() => dispatch(openDialog({ type: DialogType.Download }))}
          hotkey={ALT_O}
        />,
        <ActivityButton
          key='ladder'
          icon={<MaterialIcon icon='military_tech' size={36} />}
          label={t('ladder.activity.title', 'Ladder')}
          onClick={() => navigateToLadder()}
          hotkey={ALT_D}
        />,
        <ActivityButton
          key='leagues'
          icon={<MaterialIcon icon='social_leaderboard' size={36} />}
          label={t('leagues.activity.title', 'Leagues')}
          onClick={() => navigateToLeaguesList()}
          hotkey={ALT_G}
        />,
        <FlexSpacer key='spacer' />,
      ]

  return (
    <Container>
      <ConnectedLeftNav />
      <Content>
        <Switch>
          {isAdmin ? <Route path='/admin/:rest*' component={LoadableAdminPanel} /> : null}
          <Route path='/chat/:rest*' component={ChannelRouteComponent} />
          <Route path='/games/:rest*' component={GamesRouteComponent} />
          <Route path='/ladder/:rest*' component={LadderRouteComponent} />
          <Route path='/leagues/:rest*' component={LeagueRoot} />
          {lobbyRoute}
          {matchmakingRoute}
          {partyRoute}
          <Route path='/users/:rest*' component={ProfileRouteComponent} />
          <Route path='/whispers/:rest*' component={WhisperRouteComponent} />
          {NEWS_PAGE ? (
            <Route component={Home} />
          ) : (
            <Route>
              <GoToIndex transitionFn={replace} />
            </Route>
          )}
        </Switch>
      </Content>
      <ActivityBar>
        {activityButtons}

        <MiniActivityButtonsContainer key='mini-buttons'>
          <NotificationsButton />
          <Tooltip text={t('settings.activity.title', 'Settings (Alt + S)')} position='left'>
            <IconButton
              key='settings'
              ref={settingsButtonRef}
              icon={<MaterialIcon icon='settings' />}
              onClick={() => dispatch(openSettings())}
              testName='settings-button'
            />
          </Tooltip>
          <FriendsListActivityButton />
        </MiniActivityButtonsContainer>

        <VersionText key='version' />
      </ActivityBar>
      {IS_ELECTRON && isMatchmakingSearching ? (
        <MatchmakingSearchingOverlay
          open={searchingMatchOverlayOpen}
          anchor={searchingMatchButtonRef.current ?? undefined}
          onCancelSearch={() => {
            dispatch(cancelFindMatch())
            closeSearchingMatchOverlay()
          }}
          onDismiss={closeSearchingMatchOverlay}
        />
      ) : null}
      <ActivityOverlay />
      <NotificationPopups />
      {IS_ELECTRON ? <GlobalDropZone /> : null}
    </Container>
  )
}
