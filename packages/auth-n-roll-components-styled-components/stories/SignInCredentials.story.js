import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Box } from '../src/components/atoms/Box'
import { SignInCredentials } from '../src/components/organisms/SignInCredentials'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools/src'
import { AuthNRollProvider } from 'auth-n-roll'

storiesOf('ComponentsStyledComponents/SignInCredentialsWithFormik', module)
  .add('Default', () => (
    <AuthNRollProvider authService={ServiceInMemory()} debug>
      <Box w={'400px'} m={3}>
        <SignInCredentials/>
      </Box>
    </AuthNRollProvider>
  ))
