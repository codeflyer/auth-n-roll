import React from 'react'

import { SignInCredentialForm } from 'auth-n-roll'
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

export const SignInCredentialsBase = ({ classes }) => {
  return (
    <Card>
      <CardContent>
        <SignInCredentialForm>
          <Typography gutterBottom variant="headline" component="h2">
            Login
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <SignInCredentialForm.FieldUsername>
                <InputField
                  label="Email"
                  iconName="email"
                  IconComponent={EmailIcon}
                  placeholder="Place here your username"
                />
              </SignInCredentialForm.FieldUsername>
            </Grid>
            <Grid item xs={12}>
              <SignInCredentialForm.FieldPassword>
                <InputField
                  label="Password"
                  IconComponent={LockIcon}
                  placeholder="Place password"
                  autoComplete="current-password"
                />
              </SignInCredentialForm.FieldPassword>
            </Grid>

            <Grid item xs={12}>
              <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6}>
                  <SignInCredentialForm.ButtonSubmit>
                    <Button variant="contained" color="primary" fullWidth>
                      Login
                    </Button>
                  </SignInCredentialForm.ButtonSubmit>
                </Grid>
                <Grid item xs={6}>
                  <SignInCredentialForm.ButtonCancel>
                    <Button variant="contained" color="secondary" fullWidth>
                      Cancel
                    </Button>
                  </SignInCredentialForm.ButtonCancel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SignInCredentialForm>
      </CardContent>
    </Card>
  )
}

export const SignInCredentials = withStyles(styles)(SignInCredentialsBase)
