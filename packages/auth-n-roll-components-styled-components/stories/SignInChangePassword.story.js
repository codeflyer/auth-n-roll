import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Box } from '../src/components/atoms/Box'
import { SignInChangePassword } from '../src/components/SignInChangePassword'

storiesOf('ComponentsStyledComponents/SignInChangePassword', module)
  .add('Default', () => (
    <Box w={'400px'} m={3}>
      <SignInChangePassword/>
    </Box>
  ))
