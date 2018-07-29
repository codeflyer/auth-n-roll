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
import { SignUp } from '../pages/SignUp'
import { getSignUpUser } from '../store/selectors'

export const SignUpConfirmWithFormik = withFormik({
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
      const user = getSignUpUser(props.authNRoll)
      const result = await props.authNRollActions.confirmSignUp(
        user.username,
        values.code
      )
      setSubmitting(false)

      props.authNRollActions.setSignUpMessage({
        message: sprintf(props.authNRoll.labels.SIGNIN_CONFIRMATION_SUCCESS, {
          user
        }),
        type: 'success',
        from: 'confirm-sign-up'
      })
      props.authNRollActions.setUser(null)
      props.authNRollActions.changeFlowIndex(SignUp.FLOW_STEP_MESSAGE_AND_LOGIN)
    } catch (e) {
      setSubmitting(false)
      switch (e.code) {
        case USER_NOT_FOUND_ERROR:
          props.authNRollActions.setSignUpMessage({
            code: USER_NOT_FOUND_ERROR,
            message: sprintf(
              props.authNRoll.labels.SIGNIN_CONFIRMATION_USER_NOT_FOUND,
              { user: getUser(props.authNRoll) }
            )
          })
          props.authNRollActions.setUser(null)
          props.authNRollActions.changeFlowIndex(
            SignUp.FLOW_STEP_MESSAGE_AND_LOGIN
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

class SignUpConfirmFormBase extends React.Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    this.props.authNRollActions.signUpCancel()
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

export const SignUpConfirmForm = withAuthNRoll(
  SignUpConfirmWithFormik(SignUpConfirmFormBase)
)

SignUpConfirmForm.FieldValidationCode = ({ children }) => (
  <AuthNRollFormField id="code">{children}</AuthNRollFormField>
)

SignUpConfirmForm.ButtonSubmit = ({ children }) => (
  <AuthNRollFormButtonSubmit>{children}</AuthNRollFormButtonSubmit>
)

SignUpConfirmForm.ButtonCancel = ({ children }) => (
  <AuthNRollFormButtonOnClick actionFunctionNameOnState="onCancel">
    {children}
  </AuthNRollFormButtonOnClick>
)
