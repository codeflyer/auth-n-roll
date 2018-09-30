import React from 'react'
import { SignUpConfirmForm, Labels } from 'auth-n-roll'
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

export const SignUpConfirmBase = ({ classes }) => {
  return (
    <Card>
      <CardContent>
        <SignUpConfirmForm>
          <Typography gutterBottom variant='headline' component='h2'>
            Confirm your code
          </Typography>
          <Typography component='p'>
            A message with the verification code was sent to <Labels.SignUpUsername/>
          </Typography>

          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignUpConfirmForm.FieldValidationCode>
                <InputField
                  label='code'
                  IconComponent={VerifiedUserIcon}
                  placeholder='Add your code'
                  autoComplete='off'
                />
              </SignUpConfirmForm.FieldValidationCode>
            </Grid>
            <Grid item xs={12}>
              <ResendValidationCode signUp/>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6}>
                  <SignUpConfirmForm.ButtonSubmit>
                    <Button variant='contained' color='primary' fullWidth>
                      Confirm
                    </Button>
                  </SignUpConfirmForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignUpConfirmForm.ButtonCancel>
                    <Button variant='contained' color='secondary' fullWidth>
                      Cancel
                    </Button>
                  </SignUpConfirmForm.ButtonCancel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SignUpConfirmForm>
      </CardContent>
    </Card>
  )
}

export const SignUpConfirm = withStyles(styles)(SignUpConfirmBase)
