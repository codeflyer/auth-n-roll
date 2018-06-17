import React from 'react'

import { FormContext } from '../contexts'

export const AuthNRollFormButtonSubmit = props => (
  <FormContext.Consumer>
    {state => (
      <React.Fragment>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, {
            authForm: { isSubmitting: state.isSubmitting, type: 'submit' }
          })
        )}
      </React.Fragment>
    )}
  </FormContext.Consumer>
)
