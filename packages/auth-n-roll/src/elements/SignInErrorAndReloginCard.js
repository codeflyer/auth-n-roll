import React from 'react'
import { withAuthNRoll } from '../contexts'
import { getSignInError } from '../store/selectors'

export const SignInErrorAndReloginCard = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
)

SignInErrorAndReloginCard.ErrorMessage = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getSignInError(authNRoll).message || ''}</React.Fragment>
  )
})

SignInErrorAndReloginCard.RestartSignInButton = withAuthNRoll(({ authNRoll, authNRollActions, children }) => {
  return (
    <React.Fragment>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          onClick: authNRollActions.restartSignIn
        })
      )}
    </React.Fragment>
  )
})
