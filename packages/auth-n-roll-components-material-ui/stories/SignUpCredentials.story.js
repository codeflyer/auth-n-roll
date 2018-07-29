import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SignUpCredentials } from '../src/components/organisms/SignUpCredentials'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools/src'
import { AuthNRollProvider } from 'auth-n-roll'

storiesOf('ComponentsMaterialUI/SignUpCredentialsWithFormik', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignUpCredentials />
    </AuthNRollProvider>
  )
)
