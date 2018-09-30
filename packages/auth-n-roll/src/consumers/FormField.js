import React from 'react'

import { FormContext } from '../contexts'

export const AuthNRollFormField = props => (
  <FormContext.Consumer>
    {state => (
      <React.Fragment>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, { authForm: state, ...props })
        )}
      </React.Fragment>
    )}
  </FormContext.Consumer>
)
