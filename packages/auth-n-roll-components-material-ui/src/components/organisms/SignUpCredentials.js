import React from 'react'

import { SignUpCredentialForm } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles/index'

import { Heading } from '../atoms/index'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { InputField } from '../molecules/InputField'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export const SignUpCredentialsBase = ({ classes }) => {
  return (
    <Card>
      <CardContent>
        <SignUpCredentialForm>
          <Typography gutterBottom variant="headline" component="h2">
            Sign Up
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignUpCredentialForm.FieldUsername>
                <InputField
                  label="Email"
                  iconName="email"
                  IconComponent={EmailIcon}
                  placeholder="Place here your username"
                />
              </SignUpCredentialForm.FieldUsername>
            </Grid>
            <Grid item xs={12}>
              <SignUpCredentialForm.FieldPassword>
                <InputField
                  label="Password"
                  IconComponent={LockIcon}
                  placeholder="Place password"
                  autoComplete="current-password"
                />
              </SignUpCredentialForm.FieldPassword>
            </Grid>
            <Grid item xs={12}>
              <SignUpCredentialForm.FieldPasswordConfirm>
                <InputField
                  label="Password Confirm"
                  IconComponent={LockIcon}
                  placeholder="Verify your password"
                  autoComplete="new-password"
                />
              </SignUpCredentialForm.FieldPasswordConfirm>
            </Grid>

            <Grid item xs={12}>
              <SignUpCredentialForm.RequestSignIn>
                <Button>I already have an account</Button>
              </SignUpCredentialForm.RequestSignIn>
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6}>
                  <SignUpCredentialForm.ButtonSubmit>
                    <Button variant="contained" color="primary" fullWidth>
                      Sign Up
                    </Button>
                  </SignUpCredentialForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignUpCredentialForm.ButtonCancel>
                    <Button variant="contained" color="secondary" fullWidth>
                      Cancel
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

export const SignUpCredentials = withStyles(styles)(SignUpCredentialsBase)
