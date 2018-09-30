import { Component, createElement } from 'react'

export const isStateLess = Component => !Component.prototype.render

export default function createComponent(MaterialUIComponent, mapProps) {
  class InputComponent extends Component {
    constructor(props) {
      super(props)
      this.component = null
    }

    getRenderedComponent() {
      return this.component
    }

    render() {
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: !isStateLess(MaterialUIComponent)
          ? el => {
            this.component = el
          }
          : null
      })
    }
  }
  InputComponent.displayName = `FormikMaterialUI${MaterialUIComponent.name}`
  return InputComponent
}
