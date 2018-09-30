import React from 'react'
import { SignOut as AuthNRollSignOut, withAuthNRoll } from 'auth-n-roll'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles/index'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export const SignOutBase = ({ authNRoll }) => {
  return (
    <AuthNRollSignOut>
      <Button variant='flat' color='primary' size='small'>
        {authNRoll.labels.BUTTON_SIGNOUT}
      </Button>
    </AuthNRollSignOut>
  )
}

SignOutBase.defaultProps = {}

export const SignOut = withStyles(styles)(withAuthNRoll(SignOutBase))
