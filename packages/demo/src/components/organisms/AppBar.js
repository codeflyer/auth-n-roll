import React from 'react'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import {
  withAuthNRoll,
  isLoggedIn,
  RequireSignInButton,
  RequireSignUpButton
} from 'auth-n-roll'

import { UserAppBarWidget } from './UserAppBarWidget'

const styles = {
  root: {
    justifyContent: 'space-between'
  },
  grid: {
    height: '100%'
  },
  flex: {},
  inLineButtons: {
    display: 'flex'
  }
}

export class AppBarBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: { username: 'davide' }
    }
  }

  render() {
    return (
      <MaterialAppBar position='static'>
        <Toolbar className={this.props.classes.root}>
          <Typography color='inherit' className={this.props.classes.flex}>
            Logo
          </Typography>

          {isLoggedIn(this.props.authNRoll) ? (
            <UserAppBarWidget />
          ) : (
            <div className={this.props.classes.inLineButtons}>
              <RequireSignInButton>
                <Button color='inherit'>Sign In</Button>
              </RequireSignInButton>
              <RequireSignUpButton>
                <Button color='inherit'>Sign Up</Button>
              </RequireSignUpButton>
            </div>
          )}
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

export const AppBar = withStyles(styles)(withAuthNRoll(AppBarBase))
