import React from 'react'
import get from 'lodash/get'
import { withAuthNRoll } from '../contexts'
import { isLoggedIn, getUser } from '../store/selectors'

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
  const user = getUser(props.authNRoll)
  return (
    <div style={styles.wrapper}>
      <h5>Debug Panel</h5>
      {!user && <div>No user</div>}
      {user && (
        <React.Fragment>
          <div>
            {user.username}
            <br />
          </div>

          {get(props, 'authNRoll.challenge.ChallengeName') && (
            <div>
              {get(props, 'authNRoll.challenge.ChallengeName')}
              <br />
            </div>
          )}

          {isLoggedIn(props.authNRoll) ? (
            <div>The user is logged</div>
          ) : (
            <div>The user requires action</div>
          )}
        </React.Fragment>
      )}
    </div>
  )
})
