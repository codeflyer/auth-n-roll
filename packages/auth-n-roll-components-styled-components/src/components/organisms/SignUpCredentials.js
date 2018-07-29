import React from 'react'

import { SignUpCredentialForm } from 'auth-n-roll'

import { Card, Box, Button, Heading, Flex } from '../atoms/index'

import { InputField } from '../molecules/InputField'

export const SignUpCredentials = () => {
  return (
    <Card
      boxShadowSize="xl"
      borderWidth={1}
      borderRadius={6}
      p={2}
      m={0}
      bg="white"
    >
      <SignUpCredentialForm>
        <Heading.h3>Sign Up</Heading.h3>
        <Box mt={1}>
          <Box mb={3}>
            <SignUpCredentialForm.FieldUsername>
              <InputField
                label="Email"
                iconName="email"
                placeholder="Place here your username"
              />
            </SignUpCredentialForm.FieldUsername>
          </Box>
          <Box mb={3}>
            <SignUpCredentialForm.FieldPassword>
              <InputField
                label="Password"
                iconName="lock"
                placeholder="Place password"
              />
            </SignUpCredentialForm.FieldPassword>
          </Box>
          <Box mb={3}>
            <SignUpCredentialForm.FieldPasswordConfirm>
              <InputField
                label="Password Confirm"
                iconName="lock"
                placeholder="Place password"
              />
            </SignUpCredentialForm.FieldPasswordConfirm>
          </Box>
          <Flex justifyContent="space-between">
            <Box w={1 / 2} mr={1}>
              <SignUpCredentialForm.ButtonSubmit>
                <Button fullWidth size="medium">
                  Sign Up
                </Button>
              </SignUpCredentialForm.ButtonSubmit>
            </Box>
            <Box w={1 / 2} ml={1}>
              <SignUpCredentialForm.ButtonCancel>
                <Button fullWidth secondary size="medium">
                  Cancel
                </Button>
              </SignUpCredentialForm.ButtonCancel>
            </Box>
          </Flex>
        </Box>
      </SignUpCredentialForm>
    </Card>
  )
}
