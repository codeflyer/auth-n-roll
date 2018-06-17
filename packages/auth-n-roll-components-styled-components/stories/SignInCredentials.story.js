import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Box } from '../src/components/atoms/Box'
import { SignInCredentials } from '../src/components/SignInCredentials'

storiesOf('ComponentsStyledComponents/SignInCredentialsWithFormik', module)
  .add('Default', () => (
    <Box w={'400px'} m={3}>
      <SignInCredentials/>
    </Box>
  ))
