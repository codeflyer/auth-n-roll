import React from 'react'

export const AuthNRollContext = React.createContext('auth-n-roll')
export const FormContext = React.createContext('auth-n-roll-form')
export const StateContext = React.createContext('auth-n-roll-state')

export function withAuthNRoll(Component) {
  return class extends React.Component {
    render() {
      return (
        <AuthNRollContext.Consumer>
          {authNRoll => (
            <Component
              authNRoll={authNRoll.state}
              authNRollActions={authNRoll.actions}
              {...this.props}
            />
          )}
        </AuthNRollContext.Consumer>
      )
    }
  }
}

export const withAuthNRoll2 = Hoc => Component => withAuthNRoll(Hoc(Component))
