import React from 'react'
import { storiesOf } from '@storybook/react'
import { AuthNRollProvider } from 'auth-n-roll'

import { SignUpCredentials } from '../src/components/organisms/SignUpCredentials'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools'

storiesOf('ComponentsMaterialUI/SignUpCredentialsWithFormik', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignUpCredentials />
    </AuthNRollProvider>
  )
)
