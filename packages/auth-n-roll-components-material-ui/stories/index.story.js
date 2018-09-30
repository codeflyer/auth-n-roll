import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AuthNRollProvider, AuthProtected } from 'auth-n-roll'
import { ServiceInMemory, ServiceSwitch } from 'auth-n-roll-dev-tools'

import { SignInPage, SignUpPage, SignOut } from '../src'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleSignInCancel = this.handleSignInCancel.bind(this)
    this.handleSignUpCancel = this.handleSignUpCancel.bind(this)
  }

  handleSignInCancel() {
    action('SignIn Cancel')
  }
  handleSignUpCancel() {
    action('SignIn Cancel')
  }

  render() {
    return (
      <AuthNRollProvider
        authService={ServiceInMemory()}
        debug
        onSignInCancel={this.handleSignInCancel}
        onSignUpCancel={this.handleSignUpCancel}
        signInFlowComponent={SignInPage}
        signUpFlowComponent={SignUpPage}
        disabledFeatures={['signUp']}
      >
        <AuthProtected
        >
          This content is reserved
        </AuthProtected>
        <ServiceSwitch />
        <div style={{ left: '300px', position: 'relative' }}>
          <SignOut />
        </div>
      </AuthNRollProvider>
    )
  }
}

storiesOf('MaterialUI/FullFlow', module).add('Protected Page', () => {
  return <App />
})
