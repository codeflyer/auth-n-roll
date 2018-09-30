import React from 'react'
import { SignInConfirmSignUpForm } from 'auth-n-roll'

import { Card, Box, Button, Heading, Text, Flex } from '../atoms/index'
import { InputField } from '../molecules/InputField'
import { ResendValidationCode } from '../molecules/ResendValidationCode'

export const SignInConfirmSignUp = () => {
  return (
    <Card
      boxShadowSize='xl'
      borderWidth={1}
      borderRadius={6}
      p={2}
      m={0}
      bg='white'
    >
      <SignInConfirmSignUpForm>
        <Heading.h3>Confirm your code</Heading.h3>
        <Text>The account is not verified yet, verify it using the code you received by mail.</Text>

        <Box mt={1}>
          <Box mb={3}>
            <SignInConfirmSignUpForm.FieldValidationCode>
              <InputField
                label='code'
                iconName='lock'
                placeholder='Add your code'
              />
            </SignInConfirmSignUpForm.FieldValidationCode>
          </Box>
          <ResendValidationCode/>
          <Flex justifyContent='space-between'>
            <Box w={1 / 2} mr={1}>
              <SignInConfirmSignUpForm.ButtonSubmit>
                <Button fullWidth size='medium'>
                  Confirm
                </Button>
              </SignInConfirmSignUpForm.ButtonSubmit>
            </Box>
            <Box w={1 / 2} ml={1}>
              <SignInConfirmSignUpForm.ButtonCancel>
                <Button fullWidth secondary size='medium'>
                  Cancel
                </Button>
              </SignInConfirmSignUpForm.ButtonCancel>
            </Box>
          </Flex>

        </Box>
      </SignInConfirmSignUpForm>
    </Card>
  )
}
