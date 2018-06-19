import {
  CHANGE_PASSWORD_FORCED_USER_NOT_FOUND,
  CHANGE_PASSWORD_FORCED_ERROR,
  CHANGE_PASSWORD_FORCED_INVALID_PASSWORD,
  SIGN_IN_RESPONSE_VALIDATION_DATA
} from 'auth-n-roll'

export const ChangePasswordForced = async (
  cognito,
  stack,
  username,
  newPassword,
  session
) => {
  if (!newPassword || !username || !session) {
    throw {
      code: SIGN_IN_RESPONSE_VALIDATION_DATA,
      message: 'Username, NewPassword and Session required'
    }
  }

  try {
    const result = await cognito
      .respondToAuthChallenge({
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ClientId: stack.UserPoolClientId,
        ChallengeResponses: {
          NEW_PASSWORD: newPassword,
          USERNAME: username,
        },
        Session: session
      })
      .promise()

    return {
      user: { username },
      authData: result.AuthenticationResult,
      challenge: result.ChallengeName ? result : null
    }
  } catch (err) {
    switch (err.code) {
      case 'UserNotFoundException':
        throw {
          code: CHANGE_PASSWORD_FORCED_USER_NOT_FOUND,
          message: err.message,
          user: { username }
        }
      case 'InvalidPasswordException':
        throw {
          code: CHANGE_PASSWORD_FORCED_INVALID_PASSWORD,
          message: err.message,
          user: { username }
        }
      default:
        throw { code: CHANGE_PASSWORD_FORCED_ERROR, originalCode: err.code, message: err.message, user: { username } }
    }
  }
}
