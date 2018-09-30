import React from 'react'
import { withFormik } from 'formik'
import get from 'lodash/get'
import { sprintf } from 'sprintf-js'

import {
  AuthNRollFormField,
  AuthNRollFormFieldPassword,
  AuthNRollFormButtonSubmit,
  AuthNRollFormButtonOnClick
} from '../consumers'
import { USER_NOT_CONFIRMED_ERROR } from '../constants'
import { SignIn } from '../pages/SignIn'
import { withAuthNRoll, FormContext } from '../contexts'

export const SignInCredentialsWithFormik = withFormik({
  mapPropsToValues: props => ({
    email: get(props, 'initialValues.email', ''),
    password: get(props, 'initialValues.password', '')
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
      props.authNRollActions.setChallenge({})
      const result = await props.authNRollActions.signIn(
        values.email,
        values.password
      )
      setSubmitting(false)
      // The user created using the command line requires a NEW_PASSWORD
      if (get(result, 'challenge.ChallengeName') === 'NEW_PASSWORD_REQUIRED') {
        props.authNRollActions.setUser(result.user)
        props.authNRollActions.setChallenge(result.challenge)
        props.authNRollActions.changeFlowIndex(SignIn.FLOW_STEP_CHANGE_PASSWORD)
      } else {
        props.authNRollActions.setLoggedInUser(result.user, result.authData)
      }
    } catch (e) {
      setSubmitting(false)
      if (e.code === USER_NOT_CONFIRMED_ERROR) {
        props.authNRollActions.setUser(
          Object.assign([], e.user, { requireAction: 'USER_NOT_CONFIRMED' })
        )
        props.authNRollActions.changeFlowIndex(SignIn.FLOW_STEP_CONFIRM_CODE)
        return
      }
      setErrors({ email: sprintf(props.authNRoll.labels[e.message], { user: e.user }) })
    }
  }
})

class SignInCredentialFormBase extends React.Component {
  constructor(props) {
    super(props)

    this.handleCancel = this.handleCancel.bind(this)
    this.handleRequestSignUp = this.handleRequestSignUp.bind(this)
  }

  handleCancel() {
    this.props.authNRollActions.signInCancel()
  }

  handleRequestSignUp() {
    this.props.authNRollActions.requestSignUp()
  }

  render() {
    return (
      <FormContext.Provider
        value={Object.assign({}, this.props, { onCancel: this.handleCancel, onRequestSignUp: this.handleRequestSignUp })}
      >
        <form onSubmit={this.props.handleSubmit}>{this.props.children}</form>
      </FormContext.Provider>
    )
  }
}

export const SignInCredentialForm = withAuthNRoll(
  SignInCredentialsWithFormik(SignInCredentialFormBase)
)

SignInCredentialForm.FieldUsername = ({ children }) => (
  <AuthNRollFormField id='email'>{children}</AuthNRollFormField>
)
SignInCredentialForm.FieldPassword = ({ children }) => (
  <AuthNRollFormFieldPassword id='password'>
    {children}
  </AuthNRollFormFieldPassword>
)

SignInCredentialForm.RequestSignUp = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onRequestSignUp'>
    {children}
  </AuthNRollFormButtonOnClick>
)

SignInCredentialForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignInCredentialForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onCancel'>
    {children}
  </AuthNRollFormButtonOnClick>
)
