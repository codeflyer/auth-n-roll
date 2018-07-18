import { getUser } from './selectors'

const labels = {
  SIGNIN_CONFIRMATION_SUCCESS: 'The user %(user.username) was correctly verified.',
  SIGNIN_CONFIRMATION_USER_NOT_FOUND: '`The user %(user.username) was not found`',
  SIGNIN_USER_NOT_CONFIRMED_ERROR: 'The user %(user.username) was not confirmed yet',
  SIGNIN_NOT_AUTHORIZED_ERROR: 'Incorrect username or password.',
  SIGNIN_USER_NOT_FOUND_ERROR: 'User does not exist.',
  SIGNIN_VALIDATION_DATA_ERROR: 'Username and password required',
}

export default labels
