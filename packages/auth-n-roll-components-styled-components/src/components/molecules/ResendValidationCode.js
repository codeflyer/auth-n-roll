import React from 'react'

import { Button, Box } from '../atoms'
import { SignInResendValidationCode } from 'auth-n-roll'

export const ResendValidationCode = ({
  authNRoll: { user: { username } = {} } = {},
  error
}) => {
  return (
    <SignInResendValidationCode>
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
    </SignInResendValidationCode>
  )
}

ResendValidationCode.defaultProps = {}

ResendValidationCode.propTypes =
  SignInResendValidationCode.propTypesDefinition
