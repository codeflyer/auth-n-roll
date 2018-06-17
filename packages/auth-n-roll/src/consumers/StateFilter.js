import React from 'react'

import { StateContext } from '../contexts'

export const StateFilter = ({ name, value, children }) => (
  <StateContext.Consumer>
    {state =>
      state[name] === value && <React.Fragment>{children}</React.Fragment>
    }
  </StateContext.Consumer>
)
