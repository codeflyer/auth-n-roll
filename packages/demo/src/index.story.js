import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  SignInCredentials,
  SignInChangePassword,
  SignInValidateWithCode,
  SignInErrorAndRelogin
} from 'auth-n-roll-components-styled-components'

import { AuthNRollProvider, SignIn, SignInCredentialElement } from 'auth-n-roll'

import { ServiceInMemory, ServiceSwitch } from 'auth-n-roll-dev-tools'
import stackData from '../../../data/stack'

import { ServiceCognito } from 'auth-n-roll-service-cognito'

const styles = {
  wrapper: { width: '300px' }
}
storiesOf('Demo', module)
  .add('Signin Component', () => {
    return (
      <AuthNRollProvider authService={ServiceCognito(stackData)}>
        <div style={styles.wrapper}>
          <SignInCredentials />
        </div>
      </AuthNRollProvider>
    )
  })
  .add('Signin Page In Memory', () => {
    return (
      <AuthNRollProvider authService={ServiceInMemory()} debug>
        <div style={styles.wrapper}>
          <SignIn>
            <SignInCredentials index={SignIn.FLOW_STEP_CREDENTIAL} />
            <SignInChangePassword index={SignIn.FLOW_STEP_CHANGE_PASSWORD} />
            <SignInValidateWithCode index={SignIn.FLOW_STEP_CONFIRM_CODE} />
            <SignInErrorAndRelogin index={SignIn.FLOW_STEP_ERROR_AND_RELOGIN} />
          </SignIn>
          <ServiceSwitch />
        </div>
      </AuthNRollProvider>
    )
  })
  .add('Signin Page Cognito', () => {
    return (
      <AuthNRollProvider authService={ServiceCognito(stackData)} debug>
        <div style={styles.wrapper}>
          <SignIn>
            <SignInCredentials index={SignIn.FLOW_STEP_CREDENTIAL} />
            <SignInChangePassword index={SignIn.FLOW_STEP_CHANGE_PASSWORD} />
            <SignInValidateWithCode index={SignIn.FLOW_STEP_CONFIRM_CODE} />
            <SignInErrorAndRelogin index={SignIn.FLOW_STEP_ERROR_AND_RELOGIN} />
          </SignIn>
          <ServiceSwitch />
        </div>
      </AuthNRollProvider>
    )
  })
