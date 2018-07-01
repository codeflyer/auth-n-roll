import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { SignInChangePassword } from '../src/components/organisms/SignInChangePassword'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools/src'
import { AuthNRollProvider } from 'auth-n-roll'

storiesOf('ComponentsMaterialUI/SignInChangePassword', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignInChangePassword />
    </AuthNRollProvider>
  )
)
