const _labels = {
  FIELD_REQUIRED: 'Required',
  INVALID_EMAIL: 'Invalid email address',
  CONFIRMATION_SUCCESS: 'The user %(user.username)s was correctly verified.',
  USER_NOT_FOUND_ERROR: 'The user %(user.username)s was not found',
  USER_NOT_CONFIRMED_ERROR: 'The user %(user.username)s was not confirmed yet',
  NOT_AUTHORIZED_ERROR: 'Incorrect username or password.',
  VALIDATION_DATA_ERROR: 'Username and password required',
  PWD_NOT_MATCH_ERROR: "The password doesn't match",
  USERNAME_EXISTS_ERROR: 'Username exists',

  TITLE_CHANGE_PASSWORD_FAILED: 'Change password failed',
  TITLE_USER_VERIFIED: 'User verified',
  TITLE_USER_VERIFY_FAIL: 'Verification fail',
  TITLE_SIGNIN_FORM: 'Sign In',
  TITLE_SIGNUP_FORM: 'Sign Up',
  TITLE_CHANGE_PASSWORD_FORM: 'Change password',
  TITLE_CONFIRM_SIGNUP_FORM: 'Confirm your code',
  EMAIL_LABEL: 'Email',
  EMAIL_PLACEHOLDER: 'Place here your username',
  CODE_LABEL: 'Code',
  CODE_PLACEHOLDER: 'Add your code',
  PASSWORD_LABEL: 'Password',
  PASSWORD_PLACEHOLDER: 'Place password',
  PASSWORD_CONFIRM_LABEL: 'Password confirm',
  PASSWORD_CONFIRM_PLACEHOLDER: 'Verify your password',
  CREATE_NEW_ACCOUNT: 'I don\'t have an account',
  ALREADY_HAVE__ACCOUNT: 'I already have an account',

  CHANGE_PASSWORD_FIRST_SIGNIN: 'It\'s your first login and a password change is required.',
  CONFIRM_CODE_MESSAGE: 'The account is not verified yet, verify it using the code you received by mail.',
  CONFIRM_CODE_MESSAGE_SENT: ' A message with the verification code was sent to',
  RESEND_VALIDATION_CODE: 'Resend the verification code',
  RESEND_VALIDATION_CODE_SENDING: '...sending to',
  RESEND_VALIDATION_CODE_SENT: '...sent to',
  BUTTON_SIGNOUT: 'Logout',
  BUTTON_SIGNIN: 'Login',
  BUTTON_SIGNUP: 'Signup',
  BUTTON_CANCEL: 'Cancel',
  BUTTON_CONFIRM: 'Confirm',
  BUTTON_BACK_TO_SIGNIN: 'Back to sign in'
}

const createLabels = translator => {
  if (!translator) {
    return new Proxy(_labels, {
      get: (target, name) => target[name] || name
    })
  }

  return new Proxy(_labels, {
    get: (target, name) => translator(name)
  })
}

export default createLabels
