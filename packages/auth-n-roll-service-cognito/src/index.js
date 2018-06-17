import {
  SIGN_IN_RESPONSE_USER_NOT_FOUND,
  SIGN_IN_RESPONSE_NOT_AUTHORIZED,
  SIGN_IN_RESPONSE_OK,
  SIGN_IN_RESPONSE_CHANGE_PASSWORD,
  SIGN_IN_RESPONSE_NOT_CONFIRMED,
  SIGN_IN_RESPONSE_SOFTWARE_TOKEN_MFA,
  SIGN_IN_RESPONSE_VALIDATION_DATA,
  CONFIRM_SIGN_UP_CODE_MISMATCH,
  CONFIRM_SIGN_UP_EXPIRED_CODE,
  CONFIRM_SIGN_UP_USER_NOT_FOUND
} from 'auth-n-roll'

const { CognitoIdentityCredentials } = require('aws-sdk')
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider')

export const ServiceCognito = stack => {
  const configData = {
    cognitoidentityserviceprovider: '2016-04-18',
    UserPoolId: stack.UserPoolId, // Your user pool id here
    region: stack.Region,
    IdentityPoolId: stack.IdentityPoolId,
    credentials: new CognitoIdentityCredentials({
      UserPoolId: stack.UserPoolId,
      IdentityPoolId: stack.IdentityPoolId,
      region: stack.Region
    })
  }

  if (typeof AWS !== 'undefined') {
    AWS.config.update(configData)
  }

  const cognito = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: stack.Region
  })

  const resendConfirmationCode = async (username) => {
    if (!username) {
      throw { code: SIGN_IN_RESPONSE_VALIDATION_DATA, message: 'Username required' }
    }
    try {
      const result = await
        cognito.resendConfirmationCode(
          {
            ClientId: stack.UserPoolClientId,
            Username: username
          }).promise()

      return Object.assign({}, result, { user: { username } })
    } catch (err) {
      throw { code: err.code, message: err.message, user: { username } }
    }
  }

  const signIn = async (username, password) => {
    if (!username || !password) {
      throw { code: SIGN_IN_RESPONSE_VALIDATION_DATA, message: 'Username and password required' }
    }

    try {
      const result = await
        cognito.initiateAuth(
          {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: stack.UserPoolClientId,
            AuthParameters: {
              USERNAME: username,
              PASSWORD: password
            }
          }).promise()

      return Object.assign({}, result, { user: { username } })
    } catch (err) {
      switch (err.code) {
        case 'UserNotFoundException':
          throw { code: SIGN_IN_RESPONSE_USER_NOT_FOUND, message: err.message, user: { username } }
        case 'NotAuthorizedException':
          throw { code: SIGN_IN_RESPONSE_NOT_AUTHORIZED, message: err.message, user: { username } }
        case 'UserNotConfirmedException':
          throw { code: SIGN_IN_RESPONSE_NOT_CONFIRMED, message: err.message, user: { username } }
        default:
          console.log(err)
          throw { code: err.code, message: err.message, user: { username } }
      }
    }
  }

  const confirmSignUp = async (username, confirmationCode) => {
    if (!confirmationCode || !username) {
      throw { code: SIGN_IN_RESPONSE_VALIDATION_DATA, message: 'Username and ConfirmationCode required' }
    }

    try {
      const result = await
        cognito.resendConfirmationCode(
          {
            ClientId: stack.UserPoolClientId,
            Username: username,
            ConfirmationCode: confirmationCode
          }).promise()

      return Object.assign({}, result, { user: { username } })
    } catch (err) {
      switch (err.code) {
        case 'UserNotFoundException':
          throw { code: CONFIRM_SIGN_UP_USER_NOT_FOUND, message: err.message, user: { username } }
        case 'CodeMismatchException':
          throw { code: CONFIRM_SIGN_UP_CODE_MISMATCH, message: err.message, user: { username } }
        case 'ExpiredCodeException':
          throw { code: CONFIRM_SIGN_UP_EXPIRED_CODE, message: err.message, user: { username } }
        default:
          console.log(err)
          throw { code: err.code, message: err.message, user: { username } }
      }
    }
  }

  return {
    signIn,
    resendConfirmationCode
  }
}
