import {
  CONFIRM_SIGN_UP_CODE_MISMATCH,
  CONFIRM_SIGN_UP_EXPIRED_CODE,
  CONFIRM_SIGN_UP_USER_NOT_FOUND
} from 'auth-n-roll'

export const ConfirmSignUp = async (
  cognit,
  stack,
  username,
  confirmationCode
) => {
  if (!confirmationCode || !username) {
    throw {
      code: SIGN_IN_RESPONSE_VALIDATION_DATA,
      message: 'Username and ConfirmationCode required'
    }
  }

  try {
    const result = await cognito
      .resendConfirmationCode({
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
          code: CONFIRM_SIGN_UP_USER_NOT_FOUND,
          message: err.message,
          user: { username }
        }
      case 'CodeMismatchException':
        throw {
          code: CONFIRM_SIGN_UP_CODE_MISMATCH,
          message: err.message,
          user: { username }
        }
      case 'ExpiredCodeException':
        throw {
          code: CONFIRM_SIGN_UP_EXPIRED_CODE,
          message: err.message,
          user: { username }
        }
      default:
        console.log(err)
        throw { code: err.code, message: err.message, user: { username } }
    }
  }
}
