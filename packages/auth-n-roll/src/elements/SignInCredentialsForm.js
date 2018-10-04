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
import { USER_NOT_CONFIRMED_ERROR, INVALID_PASSWORD_ERROR } from '../constants'
import { SignIn } from '../pages/SignIn'
import { withAuthNRoll, FormContext } from '../contexts'
import { signInWith } from '../store/selectors'

export const SignInCredentialsWithFormik = withFormik({
  mapPropsToValues: props => ({
    email: get(props, 'initialValues.email', ''),
    username: get(props, 'initialValues.username', ''),
    password: get(props, 'initialValues.password', '')
  }),
  validate: (values, props) => {
    const signWithEmail = signInWith(props.authNRoll) === 'email'

    const errors = {}
    if (signWithEmail) {
      if (!values.email) {
        errors.email = props.authNRoll.labels.FIELD_REQUIRED
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = props.authNRoll.labels.INVALID_EMAIL
      }
    } else {
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
    const signWithEmail = signInWith(props.authNRoll) === 'email'

    try {
      props.authNRollActions.setChallenge({})
      const result = await props.authNRollActions.signIn(values)
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
      if (e.code === INVALID_PASSWORD_ERROR) {
        setErrors({password: sprintf(
          props.authNRoll.labels[e.message],
          { user: e.user }
        )})
        return
      }
      setErrors({
        [signWithEmail ? 'email' : 'username']: sprintf(
          props.authNRoll.labels[e.message],
          { user: e.user }
        )
      })
    }
  }
})

class SignInCredentialFormBase extends React.Component {
  constructor(props) {
    super(props)

    this.handleCancel = this.handleCancel.bind(this)
    this.handleRequestSignUp = this.handleRequestSignUp.bind(this)
    this.handleRequestResetPassword = this.handleRequestResetPassword.bind(this)
    this.handleRequestSendUsername = this.handleRequestSendUsername.bind(this)
  }

  handleCancel() {
    this.props.authNRollActions.signInCancel()
  }

  handleRequestSignUp() {
    this.props.authNRollActions.requestSignUp()
  }

  handleRequestResetPassword() {
    this.props.authNRollActions.changeFlowIndex(SignIn.FLOW_STEP_RESET_PASSWORD)
  }

  handleRequestSendUsername() {
    this.props.authNRollActions.changeFlowIndex(SignIn.FLOW_STEP_SEND_USERNAME)
  }

  render() {
    return (
      <FormContext.Provider
        value={Object.assign({}, this.props, {
          onCancel: this.handleCancel,
          onRequestSignUp: this.handleRequestSignUp,
          onRequestResetPassword: this.handleRequestResetPassword,
          onRequestSendUsername: this.handleRequestSendUsername
        })}
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
  <AuthNRollFormField id='username'>{children}</AuthNRollFormField>
)
SignInCredentialForm.FieldEmail = ({ children }) => (
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

SignInCredentialForm.RequestResetPassword = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onRequestResetPassword'>
    {children}
  </AuthNRollFormButtonOnClick>
)

SignInCredentialForm.RequestSendUsername = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onRequestSendUsername'>
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
