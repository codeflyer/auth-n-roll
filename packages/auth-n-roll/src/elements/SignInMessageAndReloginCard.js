import React from 'react'
import { withAuthNRoll } from '../contexts'
import { getSignInMessage } from '../store/selectors'

const titles = {
  'change-password-forced': 'Change password failed',
  'confirm-sign-up': 'User verified'
}

export const SignInMessageAndReloginCard = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
)

SignInMessageAndReloginCard.Message = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getSignInMessage(authNRoll).message || ''}</React.Fragment>
  )
})

SignInMessageAndReloginCard.Title = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{titles[getSignInMessage(authNRoll).from] || ''}</React.Fragment>
  )
})

SignInMessageAndReloginCard.RestartSignInButton = withAuthNRoll(({ authNRoll, authNRollActions, children }) => {
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
