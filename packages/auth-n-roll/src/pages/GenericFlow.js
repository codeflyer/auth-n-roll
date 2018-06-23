import React from 'react'

import { Switch } from '../components/Switch'
import { AuthNRollContext } from '../contexts'
import { SwitchChangePanelBar } from '../components/SwitchChangePanelBar'
import { getCurrentFlowIndex } from '../store/selectors'

export class GenericFlow extends React.Component {
  debugPanel(indexList, currentIndex, changeFlowIndex) {
    return (
      <SwitchChangePanelBar
        indexList={indexList}
        currentIndex={currentIndex}
        onClick={changeFlowIndex}
      />
    )
  }

  render() {
    const indexList = React.Children.toArray(this.props.children).map(
      child => child.props.index
    )
    return (
      <AuthNRollContext.Consumer>
        {authNRoll => (
          <React.Fragment>
            <Switch index={getCurrentFlowIndex(authNRoll) || this.props.defaultIndex}>
              {this.props.children}
            </Switch>
            {authNRoll.debug &&
              this.debugPanel(
                indexList,
                getCurrentFlowIndex(authNRoll) || this.props.defaultIndex,
                authNRoll.changeFlowIndex
              )}
          </React.Fragment>
        )}
      </AuthNRollContext.Consumer>
    )
  }
}
