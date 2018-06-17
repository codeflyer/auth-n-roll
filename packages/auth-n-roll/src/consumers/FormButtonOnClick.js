import React from 'react'

import { FormContext } from '../contexts'

export const AuthNRollFormButtonOnClick = props => (
  <FormContext.Consumer>
    {state => (
      <React.Fragment>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, {
            type: 'button',
            onClick: state[props.actionFunctionNameOnState]
          })
        )}
      </React.Fragment>
    )}
  </FormContext.Consumer>
)
