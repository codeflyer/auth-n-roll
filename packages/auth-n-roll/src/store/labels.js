const _labels = {
  SIGNIN_CONFIRMATION_SUCCESS:
    'The user %(user.username)s was correctly verified.',
  SIGNIN_CONFIRMATION_USER_NOT_FOUND:
    '`The user %(user.username)s was not found`',
  SIGNIN_USER_NOT_CONFIRMED_ERROR:
    'The user %(user.username)s was not confirmed yet',
  SIGNIN_NOT_AUTHORIZED_ERROR: 'Incorrect username or password.',
  SIGNIN_USER_NOT_FOUND_ERROR: 'User does not exist.',
  SIGNIN_VALIDATION_DATA_ERROR: 'Username and password required',

  SIGNUP_VALIDATION_DATA_ERROR: 'Username and password required',
  SIGNUP_USERNAME_EXISTS_ERROR: 'Username exists',
  SIGNUP_NOT_AUTHORIZED_ERROR: 'Incorrect username or password.',
  SIGNUP_INVALID_PASSWORD_ERROR: 'The password is incorrect'
}

const labels = new Proxy(_labels, {
  get: (target, name) => target[name] || name
})

export default labels
