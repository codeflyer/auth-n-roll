import React from 'react'

import { FormContext } from '../contexts'

export const AuthNRollFormButtonSubmit = props => (
  <FormContext.Consumer>
    {state => (
      <React.Fragment>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, {
            disabled: !!state.isSubmitting,
            onClick: state.handleSubmit
          })
        )}
      </React.Fragment>
    )}
  </FormContext.Consumer>
)
