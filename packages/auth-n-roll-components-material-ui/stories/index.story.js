import React from 'react'
import { storiesOf } from '@storybook/react'

import { AuthNRollProvider, AuthProtected } from 'auth-n-roll'
import { ServiceInMemory, ServiceSwitch } from 'auth-n-roll-dev-tools'

import { SignInPage } from '../src'

const styles = {
  wrapper: { width: '300px' }
}
storiesOf('MaterialUI/FullFlow', module)
  .add('Protected Page', () => {
  return (
    <AuthNRollProvider authService={ServiceInMemory()} debug>
      <AuthProtected signInFlowComponent={SignInPage}>
        This content is reserved
      </AuthProtected>
      <ServiceSwitch />
    </AuthNRollProvider>
  )
})
