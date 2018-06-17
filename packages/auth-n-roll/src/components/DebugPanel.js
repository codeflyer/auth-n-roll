import React from 'react'
import { withAuthNRoll } from '../contexts'

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    right: 0,
    backgroundColor: '#ddd',
    padding: '10px',
    opacity: 0.6
  }
}

export const DebugPanel = withAuthNRoll(props => (
  <div style={styles.wrapper}>
    <h5>Debug Panel</h5>
    {!props.authNRoll.user && <div>No user</div>}
    {props.authNRoll.user && (
      <React.Fragment>
        <div>
          {props.authNRoll.user.username}
          <br />
        </div>

        {props.authNRoll.user.requireAction && (
          <div>
            {props.authNRoll.user.requireAction}
            <br />
          </div>
        )}
      </React.Fragment>
    )}
  </div>
))
