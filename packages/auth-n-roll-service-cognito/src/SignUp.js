import {
  NOT_AUTHORIZED_ERROR,
  USER_NOT_CONFIRMED_ERROR,
  VALIDATION_DATA_ERROR,
  USERNAME_EXISTS_ERROR
} from 'auth-n-roll'

export const SignUp = async (cognito, stack, username, password) => {
  if (!username || !password) {
    throw {
      code: VALIDATION_DATA_ERROR,
      message: 'SIGNUP_VALIDATION_DATA_ERROR'
    }
  }

  try {
    var params = {
      ClientId: stack.UserPoolClientId,
      Password: password,
      Username: username,
      UserAttributes: [
        {
          Name: 'email',
          Value: username
        }
      ]
    }

    const result = await cognito.signUp(params).promise()

    return result
  } catch (err) {
    switch (err.code) {
      case 'UsernameExistsException':
        throw {
          code: USERNAME_EXISTS_ERROR,
          message: 'SIGNUP_USERNAME_EXISTS_ERROR',
          user: { username }
        }
      case 'NotAuthorizedException':
        throw {
          code: NOT_AUTHORIZED_ERROR,
          message: 'SIGNUP_NOT_AUTHORIZED_ERROR',
          user: { username }
        }
      case 'InvalidPasswordException':
        throw {
          code: USER_NOT_CONFIRMED_ERROR,
          message: 'SIGNUP_INVALID_PASSWORD_ERROR',
          user: { username }
        }
      default:
        throw {
          code: err.code,
          message: err.message,
          user: { username },
          sourceError: err
        }
    }
  }
}
