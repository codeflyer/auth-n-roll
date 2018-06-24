import React from 'react'

import { SignInChangePasswordForm } from 'auth-n-roll'

import { Card, Box, Button, Heading, Text, Flex } from '../atoms/index'
import { InputField } from '../molecules/InputField'

export const SignInChangePassword = () => {
  return (
    <Card
      boxShadowSize="xl"
      borderWidth={1}
      borderRadius={6}
      p={2}
      m={0}
      bg="white"
    >
      <SignInChangePasswordForm>
        <Heading.h3>Change password</Heading.h3>
        <Text>It's your first login and a password change is required.</Text>

        <Box mt={1}>
          <Box mb={3}>
            <SignInChangePasswordForm.FieldPassword>
              <InputField
                label="Password"
                iconName="lock"
                placeholder="Place your password"
              />
            </SignInChangePasswordForm.FieldPassword>
          </Box>
          <Box mb={3}>
            <SignInChangePasswordForm.FieldPasswordConfirm>
              <InputField
                label="Password Confirm"
                iconName="lock"
                placeholder="Verify your password"
              />
            </SignInChangePasswordForm.FieldPasswordConfirm>
          </Box>
          <SignInChangePasswordForm.ButtonSubmit>
            <Button>Set new password</Button>
          </SignInChangePasswordForm.ButtonSubmit>
        </Box>
      </SignInChangePasswordForm>
    </Card>
  )
}
