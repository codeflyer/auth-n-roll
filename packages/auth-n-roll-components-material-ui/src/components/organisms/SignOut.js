import React from 'react'

import { SignOut as AuthNRollSignOut, Labels } from 'auth-n-roll'

import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles/index'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

export const SignOutBase = ({ classes }) => {
  return (
    <AuthNRollSignOut>
      <Button variant="flat" color="primary" size="small">
        SignOut
      </Button>
    </AuthNRollSignOut>
  )
}

SignOutBase.defaultProps = {}

export const SignOut = withStyles(styles)(SignOutBase)
