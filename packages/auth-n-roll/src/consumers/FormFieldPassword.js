import React from 'react'
import { FormContext } from '../contexts'

export const AuthNRollFormFieldPassword = props => (
  <FormContext.Consumer>
    {state => (
      <React.Fragment>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, { authForm: Object.assign({}, state, { type: 'password' }), ...props })
        )}
      </React.Fragment>
    )}
  </FormContext.Consumer>
)
