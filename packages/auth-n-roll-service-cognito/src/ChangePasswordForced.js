import {
  USER_NOT_FOUND_ERROR,
  GENERIC_ERROR,
  INVALID_PASSWORD_ERROR,
  VALIDATION_DATA_ERROR
} from 'auth-n-roll'

export const ChangePasswordForced = async (
  cognito,
  stack,
  {
    username,
    newPassword,
    session
  }
) => {
  if (!newPassword || !username || !session) {
    throw {
      code: VALIDATION_DATA_ERROR,
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
          USERNAME: username
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
          code: USER_NOT_FOUND_ERROR,
          message: err.message,
          user: { username }
        }
      case 'InvalidPasswordException':
        throw {
          code: INVALID_PASSWORD_ERROR,
          message: err.message,
          user: { username }
        }
      default:
        throw { code: GENERIC_ERROR, originalCode: err.code, message: err.message, user: { username } }
    }
  }
}
