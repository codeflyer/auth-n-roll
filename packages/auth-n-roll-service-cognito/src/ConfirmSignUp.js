import {
  VALIDATION_CODE_MISMATCH_ERROR,
  EXPIRED_VALIDATION_CODE_ERROR,
  USER_NOT_FOUND_ERROR,
  UNMANAGED_ERROR,
  VALIDATION_DATA_ERROR
} from 'auth-n-roll'

export const ConfirmSignUp = async (
  cognito,
  stack,
  {

  username,
  confirmationCode
  }
) => {
  if (!confirmationCode || !username) {
    throw {
      code: VALIDATION_DATA_ERROR,
      message: 'Username and ConfirmationCode required'
    }
  }

  try {
    const result = await cognito
      .confirmSignUp({
        ClientId: stack.UserPoolClientId,
        Username: username,
        ConfirmationCode: confirmationCode
      })
      .promise()

    return Object.assign({}, result, { user: { username } })
  } catch (err) {
    switch (err.code) {
      case 'UserNotFoundException':
        throw {
          code: USER_NOT_FOUND_ERROR,
          message: err.message,
          user: { username }
        }
      case 'CodeMismatchException':
        throw {
          code: VALIDATION_CODE_MISMATCH_ERROR,
          message: err.message,
          user: { username }
        }
      case 'ExpiredCodeException':
        throw {
          code: EXPIRED_VALIDATION_CODE_ERROR,
          message: err.message,
          user: { username }
        }
      default:
        throw { code: UNMANAGED_ERROR, originalCode: err.code, message: err.message, user: { username } }
    }
  }
}
