import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ServiceInMemory } from 'auth-n-roll-dev-tools'
import { AuthNRollProvider } from 'auth-n-roll'

import { Box } from '../src/components/atoms/Box'
import { Card } from '../src/components/atoms/Card'
import {
  ResendValidationCodeBase,
  ResendValidationCode
} from '../src/components/molecules/ResendValidationCode'

const user = {
  username: 'Davide Fiorello',
  email: 'davide@codeflyer.com',
  username: 'davidefiorello'
}
storiesOf('ComponentsStyledComponents/molecules/ResendValidationCode', module)
  .add('With connector', () => (
    <AuthNRollProvider authService={ServiceInMemory()} debug>
      <Box w={'400px'} m={3}>
        <Card w={'400px'} m={3} mb={3}>
          <ResendValidationCode user={user} />
        </Card>
      </Box>
    </AuthNRollProvider>
  ))
