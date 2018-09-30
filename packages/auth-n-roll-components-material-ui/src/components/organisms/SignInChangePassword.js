import React from 'react'
import { SignInChangePasswordForm } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import LockIcon from '@material-ui/icons/Lock'

import { InputField } from '../molecules/InputField'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export const SignInChangePasswordBase = props => {
  const { classes } = props

  return (
    <Card>
      <CardContent>
        <SignInChangePasswordForm>
          <Typography gutterBottom variant='headline' component='h2'>
            Change password
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <Typography component='p'>
                It's your first login and a password change is required.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SignInChangePasswordForm.FieldPassword>
                <InputField
                  label='Password'
                  IconComponent={LockIcon}
                  placeholder='Place your password'
                  autoComplete='new-password'
                />
              </SignInChangePasswordForm.FieldPassword>
            </Grid>
            <Grid item xs={12}>
              <SignInChangePasswordForm.FieldPasswordConfirm>
                <InputField
                  label='Password Confirm'
                  IconComponent={LockIcon}
                  placeholder='Verify your password'
                  autoComplete='new-password'
                />
              </SignInChangePasswordForm.FieldPasswordConfirm>
            </Grid>
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={6}>
                <SignInChangePasswordForm.ButtonSubmit>
                  <Button variant='contained' color='primary' fullWidth>
                    Confirm
                  </Button>
                </SignInChangePasswordForm.ButtonSubmit>
              </Grid>
              <Grid item xs={6}>
                <SignInChangePasswordForm.ButtonCancel>
                  <Button variant='contained' color='secondary' fullWidth>
                    Cancel
                  </Button>
                </SignInChangePasswordForm.ButtonCancel>
              </Grid>
            </Grid>
          </Grid>
        </SignInChangePasswordForm>
      </CardContent>
    </Card>
  )
}

export const SignInChangePassword = withStyles(styles)(SignInChangePasswordBase)
