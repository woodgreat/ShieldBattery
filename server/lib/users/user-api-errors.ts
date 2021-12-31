import { assertUnreachable } from '../../../common/assert-unreachable'
import { UserErrorCode } from '../../../common/users/sb-user'
import { CodedError, makeErrorConverterMiddleware } from '../errors/coded-error'
import { asHttpError } from '../errors/error-with-payload'

export class UserApiError extends CodedError<UserErrorCode> {}

export const convertUserApiErrors = makeErrorConverterMiddleware(err => {
  if (!(err instanceof UserApiError)) {
    throw err
  }

  switch (err.code) {
    case UserErrorCode.NotFound:
      throw asHttpError(404, err)
    case UserErrorCode.NotAllowedOnSelf:
      throw asHttpError(409, err)
    case UserErrorCode.InvalidCode:
      throw asHttpError(410, err)
    case UserErrorCode.InvalidCredentials:
      throw asHttpError(401, err)
    case UserErrorCode.AccountBanned:
      throw asHttpError(403, err)
    case UserErrorCode.SessionExpired:
      throw asHttpError(410, err)
    case UserErrorCode.UsernameTaken:
      throw asHttpError(409, err)
    case UserErrorCode.SuspiciousActivity:
      throw asHttpError(401, err)
    case UserErrorCode.MachineBanned:
      throw asHttpError(401, err)

    default:
      assertUnreachable(err.code)
  }
})