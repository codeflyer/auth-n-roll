import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { AuthNRollProvider, AuthProtected } from 'auth-n-roll'

import { ServiceInMemory, ServiceSwitch } from 'auth-n-roll-dev-tools'
import stackData from '../../../data/stack'

import { ServiceCognito } from 'auth-n-roll-service-cognito'
import { SignInPage } from 'auth-n-roll-components-material-ui'

const styles = {
  wrapper: { width: '300px' }
}
storiesOf('Demo', module)
  .add('Signin Page In Memory', () => {
    return (
      <AuthNRollProvider authService={ServiceInMemory()} debug>
        <div style={styles.wrapper}>
          <SignInPage/>
          <ServiceSwitch />
        </div>
      </AuthNRollProvider>
    )
  })
  .add('Signin Page Cognito', () => {
    return (
      <AuthNRollProvider cookiePrefix='cognito-' authService={ServiceCognito(stackData)} debug>
        <div style={styles.wrapper}>
          <SignInPage/>
          <ServiceSwitch />
        </div>
      </AuthNRollProvider>
    )
  })
  .add('Protected Page', () => {
    return (
      <AuthNRollProvider
        authService={ServiceInMemory()}
        onLoginCancel={action('Login Cancel')}
        debug
      >
        <div style={styles.wrapper}>
          <AuthProtected signInFlowComponent={SignInPage}>This content is reserved</AuthProtected>
          <ServiceSwitch />
        </div>
      </AuthNRollProvider>
    )
  })
