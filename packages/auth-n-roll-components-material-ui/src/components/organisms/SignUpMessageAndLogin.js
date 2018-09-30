import React from 'react'
import { SignUpMessageAndLoginCard, withAuthNRoll } from 'auth-n-roll'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  actions: {
    marginTop: '20px'
  }
})

export const SignUpMessageAndLoginBase = props => {
  const { classes, authNRoll } = props

  return (
    <Card>
      <CardContent>
        <SignUpMessageAndLoginCard>
          <Typography gutterBottom variant='headline' component='h2'>
            <SignUpMessageAndLoginCard.Title />
          </Typography>
          <Grid container className={classes.actions} spacing={16}>
            <Grid item xs={12}>
              <Typography component='p'>
                <SignUpMessageAndLoginCard.Message />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SignUpMessageAndLoginCard.StartSignInButton>
                <Button variant='contained' color='primary'>
                  {authNRoll.labels.BUTTON_BACK_TO_SIGNIN}
                </Button>
              </SignUpMessageAndLoginCard.StartSignInButton>
            </Grid>
          </Grid>
        </SignUpMessageAndLoginCard>
      </CardContent>
    </Card>
  )
}

export const SignUpMessageAndLogin = withStyles(styles)(
  withAuthNRoll(SignUpMessageAndLoginBase)
)
