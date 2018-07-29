import React from 'react'

import { withAuthNRoll } from '../contexts'

export const SignOut = withAuthNRoll(props => {
  return (
    <React.Fragment>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, {
          onClick: props.authNRollActions.signOut.bind(null)
        })
      )}
    </React.Fragment>
  )
})
