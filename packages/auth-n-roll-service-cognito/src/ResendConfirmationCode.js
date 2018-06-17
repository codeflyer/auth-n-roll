export const ResendConfirmationCode = async (cognito, stack, username) => {
  if (!username) {
    throw {
      code: SIGN_IN_RESPONSE_VALIDATION_DATA,
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
    throw { code: err.code, message: err.message, user: { username } }
  }
}
