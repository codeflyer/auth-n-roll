import React from 'react'
import { SignInResendValidationCode, Labels } from 'auth-n-roll'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles/index'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export const ResendValidationCodeBase = ({ classes, signUp, labels }) => {
  const UsernameLabel = signUp ? Labels.SignUpUsername : Labels.Username

  return (
    <SignInResendValidationCode>
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <SignInResendValidationCode.ResendButton signUp={signUp}>
            <Button variant='flat' color='primary' size='small'>
              {labels.RESEND_VALIDATION_CODE}
            </Button>
          </SignInResendValidationCode.ResendButton>
        </Grid>
        <Grid item xs={12}>
          <SignInResendValidationCode.MessageSending>
            <Typography component='p'>
              {labels.RESEND_VALIDATION_CODE_SENDING} <UsernameLabel />
            </Typography>
          </SignInResendValidationCode.MessageSending>
          <SignInResendValidationCode.MessageSendingSuccess>
            <Typography component='p'>
              {labels.RESEND_VALIDATION_CODE_SENT} <UsernameLabel />
            </Typography>
          </SignInResendValidationCode.MessageSendingSuccess>

          <SignInResendValidationCode.MessageSendingError>
            <Typography component='p'>
              <SignInResendValidationCode.ErrorMessage />
            </Typography>
          </SignInResendValidationCode.MessageSendingError>
        </Grid>
      </Grid>
    </SignInResendValidationCode>
  )
}

ResendValidationCodeBase.defaultProps = {}

ResendValidationCodeBase.propTypes =
  SignInResendValidationCode.propTypesDefinition

export const ResendValidationCode = withStyles(styles)(ResendValidationCodeBase)
