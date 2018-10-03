import React from 'react'
import { withFormik } from 'formik'
import sprintf from 'sprintf'

import { withAuthNRoll, FormContext } from '../contexts'
import {
  AuthNRollFormField,
  AuthNRollFormButtonSubmit,
  AuthNRollFormButtonOnClick
} from '../consumers'
import {
  USER_NOT_FOUND_ERROR,
  VALIDATION_CODE_MISMATCH_ERROR,
  EXPIRED_VALIDATION_CODE_ERROR
} from '../constants'
import { SignIn } from '../pages/SignIn'
import { getUser } from '../store/selectors'

export const SignInConfirmSignUpWithFormik = withFormik({
  mapPropsToValues: props => ({ code: '' }),
  validate: (values, props) => {
    const errors = {}

    if (!values.code) {
      errors.code = 'Required'
    }
    return errors
  },
  // Submission handler
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    try {
      setSubmitting(true)
      const user = getUser(props.authNRoll)
      await props.authNRollActions.confirmSignUp({
        username: user.username,
        confirmationCode: values.code
      })
      setSubmitting(false)

      props.authNRollActions.setSignInMessage({
        message: sprintf(props.authNRoll.labels.CONFIRMATION_SUCCESS, {
          user
        }),
        type: 'success',
        from: 'confirm-sign-up'
      })
      props.authNRollActions.setUser(null)
      props.authNRollActions.changeFlowIndex(
        SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN
      )
    } catch (e) {
      setSubmitting(false)
      switch (e.code) {
        case USER_NOT_FOUND_ERROR:
          props.authNRollActions.setSignInMessage({
            code: USER_NOT_FOUND_ERROR,
            message: sprintf(props.authNRoll.labels.USER_NOT_FOUND_ERROR, {
              user: getUser(props.authNRoll)
            }),
            from: 'confirm-sign-up-fail'
          })
          props.authNRollActions.setUser(null)
          props.authNRollActions.changeFlowIndex(
            SignIn.FLOW_STEP_MESSAGE_AND_RELOGIN
          )
          return
        case VALIDATION_CODE_MISMATCH_ERROR:
        case EXPIRED_VALIDATION_CODE_ERROR:
          setErrors({ code: e.message })
          break
        default:
          setErrors({ code: e.message })
      }
    }
  }
})

class SignInConfirmSignUpFormBase extends React.Component {
  constructor(props) {
    super(props)

    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    this.props.authNRollActions.signInCancel()
  }

  render() {
    return (
      <FormContext.Provider
        value={Object.assign({}, this.props, { onCancel: this.handleCancel })}
      >
        <form onSubmit={this.props.handleSubmit}>{this.props.children}</form>
      </FormContext.Provider>
    )
  }
}

export const SignInConfirmSignUpForm = withAuthNRoll(
  SignInConfirmSignUpWithFormik(SignInConfirmSignUpFormBase)
)

SignInConfirmSignUpForm.FieldValidationCode = ({ children }) => (
  <AuthNRollFormField id='code'>{children}</AuthNRollFormField>
)
SignInConfirmSignUpForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignInConfirmSignUpForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState='onCancel'>
    {children}
  </AuthNRollFormButtonOnClick>
)
