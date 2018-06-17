import React from 'react'

import { SignInValidateWithCodeForm } from 'auth-n-roll'

import { Card, Box, Button, Heading, Text } from './atoms'

import { InputField } from './molecules/InputField'

import { ResendValidationCode } from './molecules/ResendValidationCode'

export const SignInValidateWithCode = () => {
  return (
    <Card
      boxShadowSize="xl"
      borderWidth={1}
      borderRadius={6}
      p={2}
      m={0}
      bg="white"
    >
      <SignInValidateWithCodeForm>
        <Heading.h3>Confirm your code</Heading.h3>
        <Text>The account is not verified yet, verify it using the code you received by mail.</Text>

        <Box mt={1}>
          <Box mb={3}>
            <SignInValidateWithCodeForm.FieldValidationCode>
              <InputField
                label="code"
                iconName="lock"
                placeholder="Add your code"
              />
            </SignInValidateWithCodeForm.FieldValidationCode>
          </Box>
          <ResendValidationCode/>
          <SignInValidateWithCodeForm.ButtonSubmit>
            <Button>Confirm</Button>
          </SignInValidateWithCodeForm.ButtonSubmit>
        </Box>
      </SignInValidateWithCodeForm>
    </Card>
  )
}

