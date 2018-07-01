import React from 'react'

import { storiesOf } from '@storybook/react'
import { SignInConfirmSignUp } from '../src/components/organisms/SignInConfirmSignUp'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools/src'
import { AuthNRollProvider } from 'auth-n-roll'

storiesOf('ComponentsMaterialUI/SignInConfirmSignUp', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignInConfirmSignUp />
    </AuthNRollProvider>
  )
)
