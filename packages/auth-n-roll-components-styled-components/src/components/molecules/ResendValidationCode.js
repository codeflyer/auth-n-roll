import React from 'react'

import { Button, Box } from '../atoms'
import {
  SignInResendValidationCode
} from 'auth-n-roll'

export const ResendValidationCodeBase = ({
  user: { username } = {},
  error
}) => {
  return (
    <Box>
      <SignInResendValidationCode.MessageSending>
        <div>...sending to {username}</div>
      </SignInResendValidationCode.MessageSending>

      <SignInResendValidationCode.MessageSendingSuccess>
        <div>...sent to {username}</div>
      </SignInResendValidationCode.MessageSendingSuccess>

      <SignInResendValidationCode.MessageSendingError>
        <div>...Error on send code {error}</div>
      </SignInResendValidationCode.MessageSendingError>

      <SignInResendValidationCode.ResendButton>
        <Button>Resend the verification code</Button>
      </SignInResendValidationCode.ResendButton>
    </Box>
  )
}

ResendValidationCodeBase.defaultProps = {}

ResendValidationCodeBase.propTypes = SignInResendValidationCode.propTypesDefinition

export const ResendValidationCode = SignInResendValidationCode(
  ResendValidationCodeBase
)
