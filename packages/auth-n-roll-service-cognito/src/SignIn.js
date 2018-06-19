import {
  SIGN_IN_RESPONSE_USER_NOT_FOUND,
  SIGN_IN_RESPONSE_NOT_AUTHORIZED,
  SIGN_IN_RESPONSE_OK,
  SIGN_IN_RESPONSE_CHANGE_PASSWORD,
  SIGN_IN_RESPONSE_NOT_CONFIRMED,
  SIGN_IN_RESPONSE_SOFTWARE_TOKEN_MFA,
  SIGN_IN_RESPONSE_VALIDATION_DATA
} from 'auth-n-roll'

export const SignIn = async (cognito, stack, username, password) => {
  if (!username || !password) {
    throw {
      code: SIGN_IN_RESPONSE_VALIDATION_DATA,
      message: 'Username and password required'
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
          code: SIGN_IN_RESPONSE_USER_NOT_FOUND,
          message: err.message,
          user: { username }
        }
      case 'NotAuthorizedException':
        throw {
          code: SIGN_IN_RESPONSE_NOT_AUTHORIZED,
          message: err.message,
          user: { username }
        }
      case 'UserNotConfirmedException':
        throw {
          code: SIGN_IN_RESPONSE_NOT_CONFIRMED,
          message: err.message,
          user: { username }
        }
      default:
        console.log(err)
        throw { code: err.code, message: err.message, user: { username } }
    }
  }
}
