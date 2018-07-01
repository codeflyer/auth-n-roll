import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SignInCredentials } from '../src/components/organisms/SignInCredentials'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools/src'
import { AuthNRollProvider } from 'auth-n-roll'

storiesOf('ComponentsMaterialUI/SignInCredentialsWithFormik', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignInCredentials />
    </AuthNRollProvider>
  )
)
