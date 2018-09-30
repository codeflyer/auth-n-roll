import React from 'react'
import { SignInCredentialForm, withAuthNRoll, hasSignup } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles/index'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'

import { InputField } from '../molecules/InputField'

const styles = () => ({
  root: {
    flexGrow: 1
  }
})

export const SignInCredentialsBase = ({ classes, authNRoll }) => {
  return (
    <Card>
      <CardContent>
        <SignInCredentialForm>
          <Typography gutterBottom variant='headline' component='h2'>
            {authNRoll.labels.TITLE_SIGNIN_FORM}
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignInCredentialForm.FieldUsername>
                <InputField
                  label={authNRoll.labels.EMAIL_LABEL}
                  iconName='email'
                  IconComponent={EmailIcon}
                  placeholder={authNRoll.labels.EMAIL_PLACEHOLDER}
                />
              </SignInCredentialForm.FieldUsername>
            </Grid>
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
            <Grid item xs={12}>
              <Grid container className={classes.root} spacing={16}>
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
