import React from 'react'
import get from 'lodash/get'
import { withAuthNRoll } from '../contexts'

export const StateFilter = withAuthNRoll(
  ({ authNRoll, getStateFunction, value, children }) =>
    getStateFunction(authNRoll) === value && (
      <React.Fragment>{children}</React.Fragment>
    )
)
