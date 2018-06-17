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

import { SignIn } from './SignIn'
import { ConfirmSignUp } from './ConfirmSignUp'
import { ResendConfirmationCode } from './ResendConfirmationCode'

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

  return {
    signIn: SignIn.bind(null, cognito, stack),
    confirmSignUp: ConfirmSignUp.bind(null, cognito, stack),
    resendConfirmationCode: ResendConfirmationCode.bind(null, cognito, stack)
  }
}
