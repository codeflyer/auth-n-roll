import React from 'react'
import { SignInConfirmSignUpForm } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles/index'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

import { InputField } from '../molecules/InputField'
import { ResendValidationCode } from '../molecules/ResendValidationCode'

const styles = () => ({
  root: {
    flexGrow: 1
  }
})

export const SignInConfirmSignUpBase = ({ classes }) => {
  return (
    <Card>
      <CardContent>
        <SignInConfirmSignUpForm>
          <Typography gutterBottom variant='headline' component='h2'>
            Confirm your code
          </Typography>
          <Typography component='p'>
            The account is not verified yet, verify it using the code you
            received by mail.
          </Typography>

          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignInConfirmSignUpForm.FieldValidationCode>
                <InputField
                  label='code'
                  IconComponent={VerifiedUserIcon}
                  placeholder='Add your code'
                  autoComplete='off'
                />
              </SignInConfirmSignUpForm.FieldValidationCode>
            </Grid>
            <Grid item xs={12}>
              <ResendValidationCode />
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6}>
                  <SignInConfirmSignUpForm.ButtonSubmit>
                    <Button variant='contained' color='primary' fullWidth>
                      Confirm
                    </Button>
                  </SignInConfirmSignUpForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignInConfirmSignUpForm.ButtonCancel>
                    <Button variant='contained' color='secondary' fullWidth>
                      Cancel
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

export const SignInConfirmSignUp = withStyles(styles)(SignInConfirmSignUpBase)
