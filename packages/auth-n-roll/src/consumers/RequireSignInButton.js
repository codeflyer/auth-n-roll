import React from 'react'

import { withAuthNRoll } from '../contexts'

export const RequireSignInButton = withAuthNRoll(({ authNRollActions, children }) => (
  <React.Fragment>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        type: 'button',
        onClick: authNRollActions.requestSignIn
      })
    )}
  </React.Fragment>
))
