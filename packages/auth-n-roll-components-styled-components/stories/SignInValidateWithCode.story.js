import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Box } from '../src/components/atoms/Box'
import { SignInValidateWithCode } from '../src/components/SignInValidateWithCode'

storiesOf('ComponentsStyledComponents/SignInValidateWithCode', module)
  .add('Default', () => (
    <Box w={'400px'} m={3}>
      <SignInValidateWithCode/>
    </Box>
  ))
