import React from 'react'

import { withAuthNRoll } from '../contexts'
import { getSignInMessage, getSignUpMessage } from '../store/selectors'


const titles = {
  'change-password-forced': 'TITLE_CHANGE_PASSWORD_FAILED',
  'confirm-sign-up': 'TITLE_USER_VERIFIED'
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
    <React.Fragment>{authNRoll.labels[titles[getSignUpMessage(authNRoll).from]] || ''}</React.Fragment>
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
