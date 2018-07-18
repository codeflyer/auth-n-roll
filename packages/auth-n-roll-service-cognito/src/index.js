const { CognitoIdentityCredentials } = require('aws-sdk')
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider')

import { SignIn } from './SignIn'
import { ConfirmSignUp } from './ConfirmSignUp'
import { ResendConfirmationCode } from './ResendConfirmationCode'
import { ChangePasswordForced } from './ChangePasswordForced'

export const ServiceCognito = stack => {
  const configData = {
    cognitoidentityserviceprovider: '2016-04-18',
    UserPoolId: stack.UserPoolId, // Your user pool id here
    region: stack.Region,
    credentials: new CognitoIdentityCredentials({
      UserPoolId: stack.UserPoolId,
      region: stack.Region
    })
  }

  if(stack.IdentityPoolId) {
    configData.IdentityPoolId = stack.IdentityPoolId
    configData.credentials.IdentityPoolId = stack.IdentityPoolId
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
    resendConfirmationCode: ResendConfirmationCode.bind(null, cognito, stack),
    changePasswordForced: ChangePasswordForced.bind(null, cognito, stack)
  }
}
