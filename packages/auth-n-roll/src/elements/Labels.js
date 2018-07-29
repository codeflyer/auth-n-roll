import React from 'react'
import { getUser, getSignUpUser } from '../store/selectors'
import { withAuthNRoll } from '../contexts'

export const Labels = {}

Labels.Username = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getUser(authNRoll).username || ''}</React.Fragment>
  )
})

Labels.SignUpUsername = withAuthNRoll(({ authNRoll }) => {
  return (
    <React.Fragment>{getSignUpUser(authNRoll).username || ''}</React.Fragment>
  )
})
