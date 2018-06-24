import React from 'react'

import { Button, Box, Flex } from '../atoms'
import { SignInResendValidationCode, Labels } from 'auth-n-roll'

export const ResendValidationCode = () => {
  return (
    <Box py={2}>
      <SignInResendValidationCode>
        <Box>
          <SignInResendValidationCode.ResendButton>
            <Button tertiary size="small">
              Resend the verification code
            </Button>
          </SignInResendValidationCode.ResendButton>
        </Box>
        <Box>
          <SignInResendValidationCode.MessageSending>
            <div>...sending to <Labels.Username/></div>
          </SignInResendValidationCode.MessageSending>
          <SignInResendValidationCode.MessageSendingSuccess>
            <div>...sent to <Labels.Username/></div>
          </SignInResendValidationCode.MessageSendingSuccess>

          <SignInResendValidationCode.MessageSendingError>
            <div>...Error on send code to <SignInResendValidationCode.ErrorMessage/></div>
          </SignInResendValidationCode.MessageSendingError>
        </Box>
      </SignInResendValidationCode>
    </Box>
  )
}

ResendValidationCode.defaultProps = {}

ResendValidationCode.propTypes = SignInResendValidationCode.propTypesDefinition
