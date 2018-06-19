import React from 'react'

export class SwitchElement extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

export class Switch extends React.Component {
  render() {
    return (
      <React.Fragment>
        {React.Children.toArray(this.props.children).find(
          child => child.props.index === this.props.index
        ) || <div>Nothing</div>}
      </React.Fragment>
    )
  }
}
