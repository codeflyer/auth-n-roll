import React from 'react'
import get from 'lodash/get'
import { withAuthNRoll } from '../contexts'

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#ddd',
    padding: '10px',
    opacity: 0.6
  }
}

export const DebugPanel = withAuthNRoll(props => {
  return (
    <div style={styles.wrapper}>
      <h5>Debug Panel</h5>
      {!props.authNRoll.user && <div>No user</div>}
      {props.authNRoll.user && (
        <React.Fragment>
          <div>
            {props.authNRoll.user.username}
            <br />
          </div>

          {get(props, 'authNRoll.challenge.ChallengeName') && (
            <div>
              {get(props, 'authNRoll.challenge.ChallengeName')}
              <br />
            </div>
          )}

          {props.authNRoll.isLoggedIn ? <div>The user is logged</div> : <div>The user requires action</div>}
        </React.Fragment>
      )}
    </div>
  )
})
