import React from 'react'
import { getUser } from '../store/selectors'
import { withAuthNRoll } from '../contexts'

export const Labels = {}

Labels.Username = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getUser(authNRoll).username || ''}</React.Fragment>
  )
})
