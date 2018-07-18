import {
  USER_NOT_FOUND_ERROR,
  NOT_AUTHORIZED_ERROR,
  RESPONSE_SUCCESS,
  FORCE_CHANGE_PASSWORD_CHALLENGE,
  USER_NOT_CONFIRMED_ERROR,
  SOFTWARE_TOKEN_MFA_CHALLENGE,
  VALIDATION_DATA_ERROR
} from 'auth-n-roll'

export const SignIn = async (cognito, stack, username, password) => {
  if (!username || !password) {
    throw {
      code: VALIDATION_DATA_ERROR,
      message: 'SIGNIN_VALIDATION_DATA_ERROR'
    }
  }

  try {
    const result = await cognito
      .initiateAuth({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: stack.UserPoolClientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password
        }
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
          message: 'SIGNIN_USER_NOT_FOUND_ERROR',
          user: { username }
        }
      case 'NotAuthorizedException':
        throw {
          code: NOT_AUTHORIZED_ERROR,
          message: 'SIGNIN_NOT_AUTHORIZED_ERROR',
          user: { username }
        }
      case 'UserNotConfirmedException':
        throw {
          code: USER_NOT_CONFIRMED_ERROR,
          message: 'SIGNIN_USER_NOT_CONFIRMED_ERROR',
          user: { username }
        }
      default:
        console.log(err)
        throw { code: err.code, message: err.message, user: { username } }
    }
  }
}
