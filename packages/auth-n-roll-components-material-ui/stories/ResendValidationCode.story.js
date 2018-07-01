import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ServiceInMemory } from 'auth-n-roll-dev-tools'
import { AuthNRollProvider } from 'auth-n-roll'

import {
  ResendValidationCode
} from '../src/components/molecules/ResendValidationCode'

const user = {
  username: 'Davide Fiorello',
  email: 'davide@codeflyer.com'
}

storiesOf('ComponentsMaterialUI/molecules/ResendValidationCode', module).add(
  'With connector',
  () => (
    <AuthNRollProvider authService={ServiceInMemory()}>
      <ResendValidationCode user={user} />
    </AuthNRollProvider>
  )
)
