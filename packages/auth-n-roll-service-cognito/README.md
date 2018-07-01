# Auth-n-roll service Cognito

***This module is a WIP don't use in a production environment***

This service implements the connection to the Aws Cognito Authentication provider.

It implements the service interface required by `auth-n-roll`

* [Service](../auth-n-roll/docs/service.md) - The service provides the connection with the server

## How to use it

```
import { ServiceCognito } from 'auth-n-roll-service-cognito'
const awsStackData = {
  UserPoolClientId: 'A Key here',
  UserPoolId: 'eu-west-1_some user pool id',
  IdentityPoolId: 'the pool id',
  Region: 'eu-west-1'
}

const cognitoService = ServiceCognito(awsStackData)
...


<AuthNRollProvider authService={cognitoService}>
  ....
</AuthNRollProvider>



