import React from 'react'
import { withAuthNRoll } from '../contexts'
import { getSignUpMessage } from '../store/selectors'

const titles = {
  'change-password-forced': 'Change password failed',
  'confirm-sign-up': 'User verified'
}

export const SignUpMessageAndLoginCard = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
)

SignUpMessageAndLoginCard.Message = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getSignUpMessage(authNRoll).message || ''}</React.Fragment>
  )
})

SignUpMessageAndLoginCard.Title = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{titles[getSignUpMessage(authNRoll).from] || ''}</React.Fragment>
  )
})

SignUpMessageAndLoginCard.StartSignInButton = withAuthNRoll(({ authNRoll, authNRollActions, children }) => {
  return (
    <React.Fragment>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          onClick: () => {
            authNRollActions.requestSignIn()
            authNRollActions.startSignIn()
          }
        })
      )}
    </React.Fragment>
  )
})
