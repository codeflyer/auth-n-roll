const fs = require('fs')
const path = require('path')

const awsConfigFile = path.join(__dirname, 'stack.json')
let awsStack
if (fs.existsSync(awsConfigFile)) {
  awsStack = JSON.parse(fs.readFileSync(awsConfigFile, 'utf8'))
} else {
  awsStack = {
    UserPoolClientId: 'xxxxxxxxx',
    UserPoolId: 'eu-west-xxxxxxxx',
    IdentityPoolId: 'eu-west-1:xxxxxxx',
    ServerlessDeploymentBucketName:
      'cognitoapp-dev-serverlessdeploymentbucket-xxxxxxxxxx'
  }
}

module.exports = {
  aws: {
    profile: 'cognito',
    stack: awsStack
  },
  clientConfig: {
    aws: {
      auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: awsStack.IdentityPoolId,
        // REQUIRED - Amazon Cognito Region
        region: awsStack.IdentityPoolId.split(':')[0],
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: awsStack.UserPoolId,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: awsStack.UserPoolClientId,
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,
        cookieStorage: {
          // REQUIRED - Cookie domain (only required if cookieStorage is provided)
          domain: 'localhost',
          // OPTIONAL - Cookie path
          path: '/',
          // OPTIONAL - Cookie expiration in days
          expires: 365,
          // OPTIONAL - Cookie secure flag
          secure: true
        }
      }
    }
  }
}
