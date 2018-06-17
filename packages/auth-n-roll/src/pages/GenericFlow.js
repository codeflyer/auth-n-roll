import React from 'react'

import { Switch } from '../components/Switch'
import { AuthNRollContext } from '../contexts'
import { SwitchChangePanelBar } from '../components/SwitchChangePanelBar'

export class GenericFlow extends React.Component {
  debugPanel(indexList, currentIndex, changeIndex) {
    return (
      <SwitchChangePanelBar
        indexList={indexList}
        currentIndex={currentIndex}
        onClick={changeIndex}
      />
    )
  }

  render() {
    const indexList = React.Children.toArray(this.props.children).map(
      child => child.props.index
    )
    React.Children.toArray(this.props.children).forEach(
      child => {
        console.log(child)
        console.log(child.switchIndex)
        console.log(child.defaultName)
        console.log(child.name)
      }
    )
    console.log(indexList)
    return (
      <AuthNRollContext.Consumer>
        {authNRoll => (
          <React.Fragment>
            <Switch index={authNRoll.switch.index || this.props.defaultIndex}>
              {this.props.children}
            </Switch>
            {authNRoll.debug && this.debugPanel(indexList, authNRoll.switch.index || this.props.defaultIndex, authNRoll.switch.changeIndex)}
          </React.Fragment>
        )}
      </AuthNRollContext.Consumer>
    )
  }
}
