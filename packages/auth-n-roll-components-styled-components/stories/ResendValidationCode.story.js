import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Box } from '../src/components/atoms/Box'
import { Card } from '../src/components/atoms/Card'
import {
  ResendValidationCodeBase,
  ResendValidationCode
} from '../src/components/molecules/ResendValidationCode'
import { ServiceCognito } from '../../auth-n-roll-service-cognito/src/index'

import { ServiceInMemory} from '../../auth-n-roll-dev-tools/src/ServiceInMemory'
import {AuthNRollProvider} from '../../auth-n-roll/src/providers/index'

const user = {
  username: 'Davide Fiorello',
  email: 'davide@codeflyer.com',
  username: 'davidefiorello'
}
storiesOf('ComponentsStyledComponents/molecules/ResendValidationCode', module)
  /*
.add('Default', () => (
<Box w={'400px'} m={3}>
  <Card w={'400px'} m={3} mb={3}>
    <ResendValidationCodeBase
      sendingState="NOT_SENT"
      user={user}
      resend={action('Send')}
    />
  </Card>
  <Card w={'400px'} m={3} mb={3}>
    <ResendValidationCodeBase
      sendingState="SENDING"
      user={user}
      resend={action('Send')}
    />
  </Card>
  <Card w={'400px'} m={3} mb={3}>
    <ResendValidationCodeBase
      sendingState="SENT"
      user={user}
      resend={action('Send')}
    />
  </Card>
</Box>
))*/
  .add('With connector', () => (
    <AuthNRollProvider authService={ServiceInMemory()} debug>
      <Box w={'400px'} m={3}>
        <Card w={'400px'} m={3} mb={3}>
          <ResendValidationCode user={user} />
        </Card>
      </Box>
    </AuthNRollProvider>
  ))
