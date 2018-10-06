import React from 'react'
import { storiesOf } from '@storybook/react'
import { AuthNRollProvider } from 'auth-n-roll'

import { SignInCredentials } from '../src/components/organisms/SignInCredentials'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools'

storiesOf('ComponentsMaterialUI/SignInCredentialsWithFormik', module)
  .add(
    'Default',
    () => (
      <AuthNRollProvider authService={ServiceInMemory()}>
        <SignInCredentials />
      </AuthNRollProvider>
    )
  )
  .add(
    'With send username',
    () => (
      <AuthNRollProvider authService={ServiceInMemory()} additionalFeatures={['sendUsername']}>
        <SignInCredentials />
      </AuthNRollProvider>
    )
  )
