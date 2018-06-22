import React from 'react'
import { SignInErrorAndReloginCard } from 'auth-n-roll'
import { Button } from '../atoms/index'

export const SignInErrorAndRelogin = (props) => {
  return (
    <SignInErrorAndReloginCard>
      <div>
        Hey, something went wrong
      </div>
      <SignInErrorAndReloginCard.ErrorMessage/>
      <SignInErrorAndReloginCard.RestartSignInButton>
        <Button>Back to sign in</Button>
      </SignInErrorAndReloginCard.RestartSignInButton>

    </SignInErrorAndReloginCard>
  )
}
