import React from 'react'
import { SignUpCredentialForm, withAuthNRoll } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles/index'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'

import { InputField } from '../molecules/InputField'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export const SignUpCredentialsBase = ({ classes, authNRoll }) => {
  return (
    <Card>
      <CardContent>
        <SignUpCredentialForm>
          <Typography gutterBottom variant='headline' component='h2'>
            {authNRoll.labels.TITLE_SIGNUP_FORM}
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignUpCredentialForm.FieldUsername>
                <InputField
                  label={authNRoll.labels.EMAIL_LABEL}
                  iconName='email'
                  IconComponent={EmailIcon}
                  placeholder={authNRoll.labels.EMAIL_PLACEHOLDER}
                />
              </SignUpCredentialForm.FieldUsername>
            </Grid>
            <Grid item xs={12}>
              <SignUpCredentialForm.FieldPassword>
                <InputField
                  label={authNRoll.labels.PASSWORD_LABEL}
                  IconComponent={LockIcon}
                  placeholder={authNRoll.labels.PASSWORD_PLACEHOLDER}
                  autoComplete='current-password'
                />
              </SignUpCredentialForm.FieldPassword>
            </Grid>
            <Grid item xs={12}>
              <SignUpCredentialForm.FieldPasswordConfirm>
                <InputField
                  label={authNRoll.labels.PASSWORD_CONFIRM_LABEL}
                  IconComponent={LockIcon}
                  placeholder={authNRoll.labels.PASSWORD_CONFIRM_PLACEHOLDER}
                  autoComplete='new-password'
                />
              </SignUpCredentialForm.FieldPasswordConfirm>
            </Grid>

            <Grid item xs={12}>
              <SignUpCredentialForm.RequestSignIn>
                <Button>{authNRoll.labels.ALREADY_HAVE__ACCOUNT}</Button>
              </SignUpCredentialForm.RequestSignIn>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6}>
                  <SignUpCredentialForm.ButtonSubmit>
                    <Button variant='contained' color='primary' fullWidth>
                      {authNRoll.labels.BUTTON_SIGNUP}
                    </Button>
                  </SignUpCredentialForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignUpCredentialForm.ButtonCancel>
                    <Button variant='contained' color='secondary' fullWidth>
                      {authNRoll.labels.BUTTON_CANCEL}
                    </Button>
                  </SignUpCredentialForm.ButtonCancel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SignUpCredentialForm>
      </CardContent>
    </Card>
  )
}

export const SignUpCredentials = withStyles(styles)(withAuthNRoll(SignUpCredentialsBase))
