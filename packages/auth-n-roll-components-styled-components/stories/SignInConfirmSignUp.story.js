import React from 'react'

import { storiesOf } from '@storybook/react'
import { Box } from '../src/components/atoms/Box'
import { SignInConfirmSignUp } from '../src/components/SignInConfirmSignUp'

storiesOf('ComponentsStyledComponents/SignInConfirmSignUp', module)
  .add('Default', () => (
    <Box w={'400px'} m={3}>
      <SignInConfirmSignUp/>
    </Box>
  ))
