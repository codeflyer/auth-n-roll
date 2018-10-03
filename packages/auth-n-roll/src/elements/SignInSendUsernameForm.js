import React from 'react'
import { withFormik } from 'formik'
import get from 'lodash/get'
import { sprintf } from 'sprintf-js'

import {
  AuthNRollFormField,
  AuthNRollFormButtonSubmit,
  AuthNRollFormButtonOnClick
} from '../consumers'
import { withAuthNRoll, FormContext } from '../contexts'
import { SignIn } from '../pages/SignIn'

export const SignInSendUsernameWithFormik = withFormik({
  mapPropsToValues: props => ({
    email: get(props, 'initialValues.email', '')
  }),
  validate: (values, props) => {
    const errors = {}
    if (!values.email) {
      errors.email = props.authNRoll.labels.FIELD_REQUIRED
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = props.authNRoll.labels.INVALID_EMAIL
    }
    return errors
  },
  // Submission handler
  handleSubmit: async (
    values,
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */
    }
  ) => {
    try {
      await props.authNRollActions.sendUsername(values)
      setSubmitting(false)

      props.authNRollActions.setSignInMessage({
        code: 'USERNAME_SENT_TO_EMAIL',
        message: sprintf(props.authNRoll.labels.USERNAME_SENT_TO_EMAIL, {
          user: { email: values.email }
        }),
        from: 'send-username-success'
      })
      props.authNRollActions.setUser(null)
      props.authNRollActions.changeFlowIndex(
        SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN
      )
    } catch (e) {
      setSubmitting(false)
      setErrors({
        email: sprintf(props.authNRoll.labels[e.message], { user: e.user })
      })
    }
  }
})

class SignInSendUsernameFormBase extends React.Component {
  constructor(props) {
    super(props)

    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    this.props.authNRollActions.changeFlowIndex(SignIn.FLOW_STEP_CREDENTIALS)
  }

  render() {
    return (
      <FormContext.Provider
        value={Object.assign({}, this.props, {
          onCancel: this.handleCancel,
          onRequestSignUp: this.handleRequestSignUp
        })}
      >
        <form onSubmit={this.props.handleSubmit}>{this.props.children}</form>
      </FormContext.Provider>
    )
  }
}

export const SignInSendUsernameForm = withAuthNRoll(
  SignInSendUsernameWithFormik(SignInSendUsernameFormBase)
)

SignInSendUsernameForm.FieldUsername = ({ children }) => (
  <AuthNRollFormField id='email'>{children}</AuthNRollFormField>
)

SignInSendUsernameForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignInSendUsernameForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onCancel'>
    {children}
  </AuthNRollFormButtonOnClick>
)
