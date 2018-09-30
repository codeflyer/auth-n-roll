/* eslint-disable no-console */
const AWS = require('aws-sdk')

const stack = require('../../../data/stack')

AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: 'nearform-dev'
})

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: stack.Region
})

async function deleteUser(username) {
  try {
    await cognitoidentityserviceprovider
      .adminDeleteUser({
        Username: username,
        UserPoolId: stack.UserPoolId
      })
      .promise()
  } catch (e) {
    console.log('[DELETE ERROR] usr not exists', username)
  }
}

async function createUserAdmin(username) {
  try {
    const user = await cognitoidentityserviceprovider
      .adminCreateUser({
        UserPoolId: stack.UserPoolId /* required */,
        Username: username,
        MessageAction: 'SUPPRESS',
        ForceAliasCreation: true,
        TemporaryPassword: 'testTEST1234',
        UserAttributes: [
          {
            Name: 'email',
            Value: username
          }
        ]
      })
      .promise()
    console.log('User created: ', user.User.Username, user.User.UserStatus)
  } catch (e) {
    console.log('[CREATE ERROR]', username, e)
  }
}

async function signUp(username) {
  try {
    const user = await cognitoidentityserviceprovider
      .signUp({
        ClientId: stack.UserPoolClientId /* required */,
        Username: username,
        Password: 'testTEST1234',
        UserAttributes: [
          {
            Name: 'email',
            Value: username
          }
        ]
      })
      .promise()
    console.log('User created (SignUP): ', user.CodeDeliveryDetails.Destination, user.UserConfirmed)
  } catch (e) {
    console.log('[CREATE ERROR]', username, e)
  }
}

async function changePassword(username) {
  try {
    const result = await cognitoidentityserviceprovider.initiateAuth(
      {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: stack.UserPoolClientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: 'testTEST1234'
        }
      }).promise()

    await cognitoidentityserviceprovider.respondToAuthChallenge({
      ClientId: stack.UserPoolClientId,
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      Session: result.Session,
      ChallengeResponses: {
        USERNAME: result.ChallengeParameters.USER_ID_FOR_SRP,
        NEW_PASSWORD: '1234TESTtest'
      }
    }).promise()
  } catch (e) {
    console.log('[CHANGE PASSWORD] Login error', username, e)
  }
}

async function run() {
  await deleteUser('davide@codeflyer.com')
  await deleteUser('davide.fiorello@nearform.com')
  await deleteUser('davide.fiorello@gmail.com')
  await createUserAdmin('davide@codeflyer.com')
  await createUserAdmin('davide.fiorello@nearform.com')
  await signUp('davide.fiorello@gmail.com')
  await changePassword('davide.fiorello@nearform.com')
}

run()
