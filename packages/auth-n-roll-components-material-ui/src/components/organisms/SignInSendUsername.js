import React from 'react'
import { SignInSendUsernameForm, withAuthNRoll } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'

import { InputField } from '../molecules/InputField'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  actions: {
    marginTop: '20px'
  }
})
export const SignInSendUsernameBase = props => {
  const { classes, authNRoll } = props

  return (
    <Card>
      <CardContent>
        <SignInSendUsernameForm>
          <Typography gutterBottom variant='headline' component='h2'>
            {authNRoll.labels.TITLE_SEND_USERNAME_FORM}
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <Typography component='p'>
                {authNRoll.labels.SEND_USERNAME_MESSAGE}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SignInSendUsernameForm.FieldUsername>
                <InputField
                  label={authNRoll.labels.EMAIL_LABEL}
                  IconComponent={EmailIcon}
                  placeholder={authNRoll.labels.EMAIL_PLACEHOLDER}
                />
              </SignInSendUsernameForm.FieldUsername>
            </Grid>
            <Grid container className={classes.actions} spacing={16}>
              <Grid item xs={6}>
                <SignInSendUsernameForm.ButtonSubmit>
                  <Button variant='contained' color='primary' fullWidth>
                    {authNRoll.labels.BUTTON_RESET}
                  </Button>
                </SignInSendUsernameForm.ButtonSubmit>
              </Grid>
              <Grid item xs={6}>
                <SignInSendUsernameForm.ButtonCancel>
                  <Button variant='contained' color='secondary' fullWidth>
                    {authNRoll.labels.BUTTON_CANCEL}
                  </Button>
                </SignInSendUsernameForm.ButtonCancel>
              </Grid>
            </Grid>
          </Grid>
        </SignInSendUsernameForm>
      </CardContent>
    </Card>
  )
}

export const SignInSendUsername = withStyles(styles)(withAuthNRoll(SignInSendUsernameBase))
