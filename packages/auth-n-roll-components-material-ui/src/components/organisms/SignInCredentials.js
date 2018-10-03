import React from 'react'
import {
  SignInCredentialForm,
  withAuthNRoll,
  hasSignup,
  canSendUsername
} from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles/index'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import LockIcon from '@material-ui/icons/Lock'
import { signInWith } from 'auth-n-roll'

import { InputField } from '../molecules/InputField'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  actions: {
    marginTop: '0px'
  }
})

export const SignInCredentialsBase = ({ classes, authNRoll }) => {
  const signWithEmail = signInWith(authNRoll) === 'email'
  return (
    <Card>
      <CardContent>
        <SignInCredentialForm>
          <Typography gutterBottom variant='headline' component='h2'>
            {authNRoll.labels.TITLE_SIGNIN_FORM}
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            {signWithEmail ? (
              <Grid item xs={12}>
                <SignInCredentialForm.FieldEmail>
                  <InputField
                    label={authNRoll.labels.EMAIL_LABEL}
                    iconName='email'
                    IconComponent={EmailIcon}
                    placeholder={authNRoll.labels.EMAIL_PLACEHOLDER}
                  />
                </SignInCredentialForm.FieldEmail>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <SignInCredentialForm.FieldUsername>
                  <InputField
                    label={authNRoll.labels.USERNAME_LABEL}
                    iconName='username'
                    IconComponent={VerifiedUserIcon}
                    placeholder={authNRoll.labels.USERNAME_PLACEHOLDER}
                  />
                </SignInCredentialForm.FieldUsername>
              </Grid>
            )}
            <Grid item xs={12}>
              <SignInCredentialForm.FieldPassword>
                <InputField
                  label={authNRoll.labels.PASSWORD_LABEL}
                  IconComponent={LockIcon}
                  placeholder={authNRoll.labels.PASSWORD_PLACEHOLDER}
                  autoComplete='current-password'
                />
              </SignInCredentialForm.FieldPassword>
            </Grid>

            {hasSignup(authNRoll) && (
              <Grid item xs={12}>
                <SignInCredentialForm.RequestSignUp>
                  <Button>{authNRoll.labels.CREATE_NEW_ACCOUNT}</Button>
                </SignInCredentialForm.RequestSignUp>
              </Grid>
            )}

            {canSendUsername(authNRoll) && (
              <Grid item xs={12}>
                <SignInCredentialForm.RequestSendUsername>
                  <Button>{authNRoll.labels.SEND_USERNAME}</Button>
                </SignInCredentialForm.RequestSendUsername>
              </Grid>
            )}

            <Grid item xs={12}>
              <SignInCredentialForm.RequestResetPassword>
                <Button>{authNRoll.labels.RESET_PASSWORD}</Button>
              </SignInCredentialForm.RequestResetPassword>
            </Grid>

            <Grid item xs={12}>
              <Grid container className={classes.actions} spacing={16}>
                <Grid item xs={6}>
                  <SignInCredentialForm.ButtonSubmit>
                    <Button variant='contained' color='primary' fullWidth>
                      {authNRoll.labels.BUTTON_SIGNIN}
                    </Button>
                  </SignInCredentialForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignInCredentialForm.ButtonCancel>
                    <Button variant='contained' color='secondary' fullWidth>
                      {authNRoll.labels.BUTTON_CANCEL}
                    </Button>
                  </SignInCredentialForm.ButtonCancel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SignInCredentialForm>
      </CardContent>
    </Card>
  )
}

export const SignInCredentials = withStyles(styles)(
  withAuthNRoll(SignInCredentialsBase)
)
