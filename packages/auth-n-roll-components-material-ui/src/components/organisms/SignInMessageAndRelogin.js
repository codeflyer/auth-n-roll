import React from 'react'
import { SignInMessageAndReloginCard, withAuthNRoll } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export const SignInMessageAndReloginBase = props => {
  const { classes, authNRoll } = props

  return (
    <Card>
      <CardContent>
        <SignInMessageAndReloginCard>
          <Typography gutterBottom variant='headline' component='h2'>
            <SignInMessageAndReloginCard.Title />
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <Typography component='p'>
                <SignInMessageAndReloginCard.Message />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SignInMessageAndReloginCard.RestartSignInButton>
                <Button variant='contained' color='primary'>
                  {authNRoll.labels.BUTTON_BACK_TO_SIGNIN}
                </Button>
              </SignInMessageAndReloginCard.RestartSignInButton>
            </Grid>
          </Grid>
        </SignInMessageAndReloginCard>
      </CardContent>
    </Card>
  )
}

export const SignInMessageAndRelogin = withStyles(styles)(
  withAuthNRoll(SignInMessageAndReloginBase)
)
