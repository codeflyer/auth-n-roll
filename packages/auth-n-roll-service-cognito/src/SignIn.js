import {
  USER_NOT_FOUND_ERROR,
  NOT_AUTHORIZED_ERROR,
  USER_NOT_CONFIRMED_ERROR,
  VALIDATION_DATA_ERROR
} from 'auth-n-roll'

export const SignIn = async (cognito, stack, username, password) => {
  if (!username || !password) {
    throw {
      code: VALIDATION_DATA_ERROR,
      message: 'VALIDATION_DATA_ERROR'
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
      authData: Object.assign({}, result.AuthenticationResult, {
        Expires: Math.floor(Date.now() / 1000) + result.AuthenticationResult.ExpiresIn
      }),
      challenge: result.ChallengeName ? result : null
    }
  } catch (err) {
    switch (err.code) {
      case 'UserNotFoundException':
        throw {
          code: USER_NOT_FOUND_ERROR,
          message: 'USER_NOT_FOUND_ERROR',
          user: { username }
        }
      case 'NotAuthorizedException':
        throw {
          code: NOT_AUTHORIZED_ERROR,
          message: 'NOT_AUTHORIZED_ERROR',
          user: { username }
        }
      case 'UserNotConfirmedException':
        throw {
          code: USER_NOT_CONFIRMED_ERROR,
          message: 'USER_NOT_CONFIRMED_ERROR',
          user: { username }
        }
      default:
        throw { code: err.code, message: err.message, user: { username }, sourceError: err }
    }
  }
}
