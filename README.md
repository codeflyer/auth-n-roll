# Auth-n-roll
***Auth-n-Roll is React library that provide all you need for the authentication process.***

Auth-n-Roll is a suite of different components that allow to connect to different authentication provider (AWS cognito is currently implemented) and an easy way to build your own layout around the logic provided by the core.

## Demo

```
npm install

npm run storybook
```

open the page at `http://localhost:6006/`


## Quick start

Install the components
```
npm install --save auth-n-roll --auth-n-roll-components-styled-components --auth-n-roll-service-cognito
```

Create your app

```javascript
import React from 'react'
import { AuthNRollProvider, AuthProtected } from 'auth-n-roll'
import { ServiceCognito } from 'auth-n-roll-service-cognito'
import { SignInPage } from 'auth-n-roll-components-styled-components'

const awsStackData = {
  UserPoolClientId: 'A Key here',
  UserPoolId: 'eu-west-1_some user pool id',
  IdentityPoolId: 'the pool id',
  Region: 'eu-west-1'
}

class App extends React.Component {
  render() {
    return (
      <AuthNRollProvider authService={ServiceCognito(awsStackData)}>
        <AuthProtected signInFlowComponent={SignInPage}>
          This content is protected
        </AuthProtected>
      </AuthNRollProvider>
    )
  }
}
```

## The modules

### [auth-n-roll](./packages/auth-n-roll/README.md)
Is the core component, contains all the logic to sign-in and sign-up (not implemented yet). It should be used with a `service` that manage the connection/Logic with the `auth` provider and with a `components` module that implements the design layout.

### [auth-n-roll-service-cognito](./packages/auth-n-roll-service-cognito/README.md)
Is the service provider that allow auth-n-roll to use `aws-cognito` as authentication provider.

### [auth-n-roll-components-styled-components](./packages/auth-n-roll-components-styled-components/README.md)
Is the component library that implement the design. It uses the styled-components. Is very easy to build a custom library.

### [auth-n-roll-dev-tools](./packages/auth-n-roll-dev-tools/README.md)
A bunch of utility that can be used in the development environment. An InMemoryService is provided that allow to use the authentication flow without a provider.

### [demo](./packages/demo/README.md)
A demo application
