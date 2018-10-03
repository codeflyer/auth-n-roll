import React from 'react'
import { storiesOf } from '@storybook/react'
import { AuthNRollProvider } from 'auth-n-roll'

import { SignInSendUsername } from '../src/components/organisms/SignInSendUsername'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools'

storiesOf('ComponentsMaterialUI/SignInSendUsername', module).add(
  'Default',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <SignInSendUsername />
    </AuthNRollProvider>
  )
)
