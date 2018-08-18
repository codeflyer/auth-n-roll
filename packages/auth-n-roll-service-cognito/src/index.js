const AWS = require('aws-sdk/lib/core.js')
require('aws-sdk/lib/credentials/cognito_identity_credentials.js')
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider')

import { SignOut } from './SignOut'
import { SignUp } from './SignUp'
import { SignIn } from './SignIn'
import { Refresh } from './Refresh'
import { ConfirmSignUp } from './ConfirmSignUp'
import { ResendConfirmationCode } from './ResendConfirmationCode'
import { ChangePasswordForced } from './ChangePasswordForced'

export const ServiceCognito = stack => {
  const configData = {
    cognitoidentityserviceprovider: '2016-04-18',
    region: stack.Region,
    UserPoolId: stack.UserPoolId, // Your user pool id here
    IdentityPoolId: stack.IdentityPoolId,
    credentials: new AWS.CognitoIdentityCredentials({
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
    signUp: SignUp.bind(null, cognito, stack),
    signOut: SignOut.bind(null, cognito, stack),
    signIn: SignIn.bind(null, cognito, stack),
    refresh: Refresh.bind(null, cognito, stack),
    confirmSignUp: ConfirmSignUp.bind(null, cognito, stack),
    resendConfirmationCode: ResendConfirmationCode.bind(null, cognito, stack),
    changePasswordForced: ChangePasswordForced.bind(null, cognito, stack)
  }
}
