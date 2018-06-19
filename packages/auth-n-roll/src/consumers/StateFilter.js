import React from 'react'
import get from 'lodash/get'
import { withAuthNRoll } from '../contexts'

export const StateFilter = withAuthNRoll(
  ({ authNRoll, name, value, children }) =>
    get(authNRoll, name) === value && (
      <React.Fragment>{children}</React.Fragment>
    )
)
