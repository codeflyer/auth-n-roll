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
import { getResetPasswordFields } from '../store/resetPassword'
import { EMAIL_AND_USER_DONT_MATCH_ERROR, USER_NOT_FOUND_ERROR } from '../constants'

export const SignInResetPasswordWithFormik = withFormik({
  mapPropsToValues: props => ({
    email: get(props, 'initialValues.email', ''),
    username: get(props, 'initialValues.username', '')
  }),
  validate: (values, props) => {
    const passwordFields = getResetPasswordFields(props.authNRoll)
    const errors = {}
    if (passwordFields.includes('email')) {
      if (!values.email) {
        errors.email = props.authNRoll.labels.FIELD_REQUIRED
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = props.authNRoll.labels.INVALID_EMAIL
      }
    }
    if (passwordFields.includes('username')) {
      if (!values.username) {
        errors.username = props.authNRoll.labels.FIELD_REQUIRED
      }
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
      await props.authNRollActions.resetPassword(values)
      setSubmitting(false)

      props.authNRollActions.setSignInMessage({
        code: 'RESET_PASSWORD_SENT_TO_USER',
        message: sprintf(props.authNRoll.labels.RESET_PASSWORD_SENT_TO_USER, {
          user: { username: values.email }
        }),
        from: 'reset-password-success'
      })
      props.authNRollActions.setUser(null)
      props.authNRollActions.changeFlowIndex(
        SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN
      )
    } catch (e) {
      setSubmitting(false)
      if (e.code === USER_NOT_FOUND_ERROR) {
        setErrors({username: sprintf(
          props.authNRoll.labels[e.message],
          { user: e.user }
        )})
        return
      }

      if (e.code === EMAIL_AND_USER_DONT_MATCH_ERROR) {
        setErrors({email: sprintf(
          props.authNRoll.labels[e.message],
          { user: e.user }
        )})
        return
      }
      setErrors({
        email: sprintf(props.authNRoll.labels[e.message], { user: e.user })
      })
    }
  }
})

class SignInResetPasswordFormBase extends React.Component {
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

export const SignInResetPasswordForm = withAuthNRoll(
  SignInResetPasswordWithFormik(SignInResetPasswordFormBase)
)

SignInResetPasswordForm.FieldEmail = ({ children }) => (
  <AuthNRollFormField id='email'>{children}</AuthNRollFormField>
)

SignInResetPasswordForm.FieldUsername = ({ children }) => (
  <AuthNRollFormField id='username'>{children}</AuthNRollFormField>
)

SignInResetPasswordForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignInResetPasswordForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onCancel'>
    {children}
  </AuthNRollFormButtonOnClick>
)
