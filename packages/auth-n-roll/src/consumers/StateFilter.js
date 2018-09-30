import React from 'react'

import { withAuthNRoll } from '../contexts'

export const StateFilter = withAuthNRoll(
  ({ authNRoll, getStateFunction, value, children }) =>
    getStateFunction(authNRoll) === value && (
      <React.Fragment>{children}</React.Fragment>
    )
)
