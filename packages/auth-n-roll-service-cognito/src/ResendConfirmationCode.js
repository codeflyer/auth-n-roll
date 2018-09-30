import { GENERIC_ERROR, VALIDATION_DATA_ERROR } from 'auth-n-roll'

export const ResendConfirmationCode = async (cognito, stack, username) => {
  if (!username) {
    throw {
      code: VALIDATION_DATA_ERROR,
      message: 'Username required'
    }
  }
  try {
    const result = await cognito
      .resendConfirmationCode({
        ClientId: stack.UserPoolClientId,
        Username: username
      })
      .promise()

    return Object.assign({}, result, { user: { username } })
  } catch (err) {
    throw {
      code: GENERIC_ERROR,
      originalCode: err.code,
      message: err.message,
      user: { username }
    }
  }
}
