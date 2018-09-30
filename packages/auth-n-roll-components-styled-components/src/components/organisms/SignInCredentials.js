import React from 'react'
import { SignInCredentialForm } from 'auth-n-roll'

import { Card, Box, Button, Heading, Flex } from '../atoms/index'
import { InputField } from '../molecules/InputField'

export const SignInCredentials = () => {
  return (
    <Card
      boxShadowSize='xl'
      borderWidth={1}
      borderRadius={6}
      p={2}
      m={0}
      bg='white'
    >
      <SignInCredentialForm>
        <Heading.h3>Login</Heading.h3>
        <Box mt={1}>
          <Box mb={3}>
            <SignInCredentialForm.FieldUsername>
              <InputField
                label='Email'
                iconName='email'
                placeholder='Place here your username'
              />
            </SignInCredentialForm.FieldUsername>
          </Box>
          <Box mb={3}>
            <SignInCredentialForm.FieldPassword>
              <InputField
                label='Password'
                iconName='lock'
                placeholder='Place password'
              />
            </SignInCredentialForm.FieldPassword>
          </Box>
          <Flex justifyContent='space-between'>
            <Box w={1 / 2} mr={1}>
              <SignInCredentialForm.ButtonSubmit>
                <Button fullWidth size='medium'>
                  Login
                </Button>
              </SignInCredentialForm.ButtonSubmit>
            </Box>
            <Box w={1 / 2} ml={1}>
              <SignInCredentialForm.ButtonCancel>
                <Button fullWidth secondary size='medium'>
                  Cancel
                </Button>
              </SignInCredentialForm.ButtonCancel>
            </Box>
          </Flex>
        </Box>
      </SignInCredentialForm>
    </Card>
  )
}
