import React from 'react'
import { SignInConfirmSignUpForm, withAuthNRoll } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles/index'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

import { InputField } from '../molecules/InputField'
import { ResendValidationCode } from '../molecules/ResendValidationCode'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  actions: {
    marginTop: '0px'
  }
})

export const SignInConfirmSignUpBase = ({ classes, authNRoll }) => {
  return (
    <Card>
      <CardContent>
        <SignInConfirmSignUpForm>
          <Typography gutterBottom variant='headline' component='h2'>
            {authNRoll.labels.TITLE_CONFIRM_SIGNUP_FORM}
          </Typography>
          <Typography component='p'>
            {authNRoll.labels.CONFIRM_CODE_MESSAGE}
          </Typography>

          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignInConfirmSignUpForm.FieldValidationCode>
                <InputField
                  label={authNRoll.labels.CODE_LABEL}
                  IconComponent={VerifiedUserIcon}
                  placeholder={authNRoll.labels.CODE_PLACEHOLDER}
                  autoComplete='off'
                />
              </SignInConfirmSignUpForm.FieldValidationCode>
            </Grid>
            <Grid item xs={12}>
              <ResendValidationCode labels={authNRoll.labels}/>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.actions} spacing={16}>
                <Grid item xs={6}>
                  <SignInConfirmSignUpForm.ButtonSubmit>
                    <Button variant='contained' color='primary' fullWidth>
                      {authNRoll.labels.BUTTON_CONFIRM}
                    </Button>
                  </SignInConfirmSignUpForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignInConfirmSignUpForm.ButtonCancel>
                    <Button variant='contained' color='secondary' fullWidth>
                      {authNRoll.labels.BUTTON_CANCEL}
                    </Button>
                  </SignInConfirmSignUpForm.ButtonCancel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SignInConfirmSignUpForm>
      </CardContent>
    </Card>
  )
}

export const SignInConfirmSignUp = withStyles(styles)(withAuthNRoll(SignInConfirmSignUpBase))
