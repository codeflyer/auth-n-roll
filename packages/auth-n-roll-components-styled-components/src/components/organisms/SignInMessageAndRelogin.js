import React from 'react'
import { SignInMessageAndReloginCard } from 'auth-n-roll'

import { Button, Card, Heading, Box } from '../atoms/index'

export const SignInMessageAndRelogin = props => {
  return (
    <Card
      boxShadowSize='xl'
      borderWidth={1}
      borderRadius={6}
      p={2}
      m={0}
      bg='white'
    >
      <SignInMessageAndReloginCard>
        <Heading.h3>
          <SignInMessageAndReloginCard.Title />
        </Heading.h3>
        <Box py={2}>
          <SignInMessageAndReloginCard.Message />
        </Box>
        <SignInMessageAndReloginCard.RestartSignInButton>
          <Button fullWidth>Back to sign in</Button>
        </SignInMessageAndReloginCard.RestartSignInButton>
      </SignInMessageAndReloginCard>
    </Card>
  )
}
