// post url
// enable by other component
import React from 'react'
import { Component } from '../baseComponent'

type Props = {}

type State = {
  isBtnEnable: boolean
}

export class Submit extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isBtnEnable: false,
    }
    this.eventsHub.registerSubmitStatusChange(this.setSubmitStatus)
  }

  setSubmitStatus = (enable: boolean) => {
    this.setState({
      isBtnEnable: enable,
    })
  }

  render() {
    return <div>{`submit: ${this.state.isBtnEnable}`}</div>
  }
}
