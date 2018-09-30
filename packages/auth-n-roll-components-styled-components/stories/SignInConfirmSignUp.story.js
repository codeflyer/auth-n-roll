import React from 'react'
import { storiesOf } from '@storybook/react'
import { AuthNRollProvider } from 'auth-n-roll'

import { Box } from '../src/components/atoms/Box'
import { SignInConfirmSignUp } from '../src/components/organisms/SignInConfirmSignUp'
import { ServiceInMemory } from '../../auth-n-roll-dev-tools/src'

storiesOf('ComponentsStyledComponents/SignInConfirmSignUp', module)
  .add('Default', () => (
    <AuthNRollProvider authService={ServiceInMemory()} debug>
      <Box w={'400px'} m={3}>
        <SignInConfirmSignUp/>
      </Box>
    </AuthNRollProvider>
  ))
