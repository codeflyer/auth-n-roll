import React from 'react'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import AddIcon from '@material-ui/icons/Person'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import {
  withAuthNRoll,
  isLoggedIn,
  RequireSignInButton,
  RequireSignUpButton
} from 'auth-n-roll'

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

export class UserAppBarWidgetBase extends React.Component {
  constructor(props) {
    super(props)

    this.anchorEl = null
    this.state = {
      open: false
    }

    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleToggle(event) {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose(event) {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <Button
          mini
          color="secondary"
          variant="fab"
          buttonRef={node => {
            this.anchorEl = node
          }}
          aria-owns={open ? 'menu-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <AddIcon />
        </Button>
        <Popper
          open={this.state.open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'right top' : 'right bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <React.Fragment>
                    <ListItem>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                    </ListItem>
                    <Divider />
                    <MenuList>
                      <MenuItem onClick={this.props.authNRollActions.signOut}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </React.Fragment>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

export const UserAppBarWidget = withStyles(styles)(
  withAuthNRoll(UserAppBarWidgetBase)
)
