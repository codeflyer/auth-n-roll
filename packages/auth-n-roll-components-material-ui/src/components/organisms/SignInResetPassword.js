import React from 'react'
import { SignInResetPasswordForm, withAuthNRoll, getResetPasswordFields } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

import { InputField } from '../molecules/InputField'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  actions: {
    marginTop: '20px'
  }
})
export const SignInResetPasswordBase = props => {
  const { classes, authNRoll } = props
  const passwordFields = getResetPasswordFields(props.authNRoll)
  return (
    <Card>
      <CardContent>
        <SignInResetPasswordForm>
          <Typography gutterBottom variant='headline' component='h2'>
            {authNRoll.labels.TITLE_RESET_PASSWORD_FORM}
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <Typography component='p'>
                {authNRoll.labels.RESET_PASSWORD_MESSAGE}
              </Typography>
            </Grid>
            {passwordFields.includes('email') && (
              <Grid item xs={12}>
                <SignInResetPasswordForm.FieldEmail>
                  <InputField
                    label={authNRoll.labels.EMAIL_LABEL}
                    IconComponent={EmailIcon}
                    placeholder={authNRoll.labels.EMAIL_PLACEHOLDER}
                  />
                </SignInResetPasswordForm.FieldEmail>
              </Grid>
            )}
            {passwordFields.includes('username') && (
              <Grid item xs={12}>
                <SignInResetPasswordForm.FieldUsername>
                  <InputField
                    label={authNRoll.labels.USERNAME_LABEL}
                    IconComponent={VerifiedUserIcon}
                    placeholder={authNRoll.labels.USERNAME_PLACEHOLDER}
                  />
                </SignInResetPasswordForm.FieldUsername>
              </Grid>
            )}
            <Grid container className={classes.actions} spacing={16}>
              <Grid item xs={6}>
                <SignInResetPasswordForm.ButtonSubmit>
                  <Button variant='contained' color='primary' fullWidth>
                    {authNRoll.labels.BUTTON_RESET}
                  </Button>
                </SignInResetPasswordForm.ButtonSubmit>
              </Grid>
              <Grid item xs={6}>
                <SignInResetPasswordForm.ButtonCancel>
                  <Button variant='contained' color='secondary' fullWidth>
                    {authNRoll.labels.BUTTON_CANCEL}
                  </Button>
                </SignInResetPasswordForm.ButtonCancel>
              </Grid>
            </Grid>
          </Grid>
        </SignInResetPasswordForm>
      </CardContent>
    </Card>
  )
}

export const SignInResetPassword = withStyles(styles)(
  withAuthNRoll(SignInResetPasswordBase)
)
