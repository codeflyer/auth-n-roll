import React from 'react'
import { storiesOf } from '@storybook/react'
import { AuthNRollProvider } from 'auth-n-roll'

import { SignInResetPassword } from '../src/components/organisms/SignInResetPassword'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools'

storiesOf('ComponentsMaterialUI/SignInResetPassword', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignInResetPassword />
    </AuthNRollProvider>
  )
)
