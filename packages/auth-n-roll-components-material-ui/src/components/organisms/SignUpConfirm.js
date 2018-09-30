import React from 'react'
import { SignUpConfirmForm, Labels, withAuthNRoll } from 'auth-n-roll'
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

export const SignUpConfirmBase = ({ classes, authNRoll }) => {
  return (
    <Card>
      <CardContent>
        <SignUpConfirmForm>
          <Typography gutterBottom variant='headline' component='h2'>
            {authNRoll.labels.TITLE_CONFIRM_SIGNUP_FORM}
          </Typography>
          <Typography component='p'>
            {authNRoll.labels.CONFIRM_CODE_MESSAGE_SENT} <Labels.SignUpUsername/>
          </Typography>

          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignUpConfirmForm.FieldValidationCode>
                <InputField
                  label={authNRoll.labels.CODE_LABEL}
                  IconComponent={VerifiedUserIcon}
                  placeholder={authNRoll.labels.CODE_PLACEHOLDER}
                  autoComplete='off'
                />
              </SignUpConfirmForm.FieldValidationCode>
            </Grid>
            <Grid item xs={12}>
              <ResendValidationCode signUp labels={authNRoll.labels}/>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6}>
                  <SignUpConfirmForm.ButtonSubmit>
                    <Button variant='contained' color='primary' fullWidth>
                      {authNRoll.labels.BUTTON_CONFIRM}
                    </Button>
                  </SignUpConfirmForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignUpConfirmForm.ButtonCancel>
                    <Button variant='contained' color='secondary' fullWidth>
                      {authNRoll.labels.BUTTON_CANCEL}
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

export const SignUpConfirm = withStyles(styles)(withAuthNRoll(SignUpConfirmBase))
