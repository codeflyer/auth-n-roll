import React from 'react'
import { storiesOf } from '@storybook/react'
import { AuthNRollProvider } from 'auth-n-roll'

import { SignInConfirmSignUp } from '../src/components/organisms/SignInConfirmSignUp'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools'

storiesOf('ComponentsMaterialUI/SignInConfirmSignUp', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignInConfirmSignUp />
    </AuthNRollProvider>
  )
)
