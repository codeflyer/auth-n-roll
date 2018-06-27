import React from 'react'
import { withFormik } from 'formik'
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

export const SignInConfirmSignUp = withFormik({
  mapPropsToValues: props => ({ code: '' }),
  validate: (values, props) => {
    const errors = {}

    if (!values.code) {
      errors.code = 'Required'
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
      setSubmitting(true)
      const user = getUser(props.authNRoll)
      const result = await props.authNRollActions.confirmSignUp(
        user.username,
        values.code
      )
      setSubmitting(false)

      props.authNRollActions.setSignInMessage({
        message: `The user ${user.username} was correctly verified.`,
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
            message: `The user ${
              getUser(props.authNRoll).username
            } was not found`
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

export const SignInConfirmSignUpForm = withAuthNRoll(
  SignInConfirmSignUp(props => (
    <FormContext.Provider value={props}>
      <form onSubmit={props.handleSubmit}>{props.children}</form>
    </FormContext.Provider>
  ))
)

SignInConfirmSignUpForm.FieldValidationCode = ({ children }) => (
  <AuthNRollFormField id="code">{children}</AuthNRollFormField>
)
SignInConfirmSignUpForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignInConfirmSignUpForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState="onCancel">
    {children}
  </AuthNRollFormButtonOnClick>
)
