import { VALIDATION_DATA_ERROR } from 'auth-n-roll'

export const Refresh = async (cognito, stack, refreshToken) => {
  if (!refreshToken) {
    throw {
      code: VALIDATION_DATA_ERROR,
      message: 'VALIDATION_DATA_ERROR'
    }
  }

  try {
    const result = await cognito
      .initiateAuth({
        AuthFlow: 'REFRESH_TOKEN',
        ClientId: stack.UserPoolClientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken
        }
      })
      .promise()

    return {
      authData: Object.assign({}, result.AuthenticationResult, {
        Expires: Math.floor(Date.now() / 1000) + result.AuthenticationResult.ExpiresIn,
        RefreshToken: refreshToken
      }),
      challenge: result.ChallengeName ? result : null
    }
  } catch (err) {
    switch (err.code) {
      default:
        throw { code: err.code, message: err.message, sourceError: err }
    }
  }
}
