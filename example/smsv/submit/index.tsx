import * as React from 'react'
import { Component } from '../baseComponent'
import { Button } from 'antd'

type Props = {}

type State = {
  isBtnEnable: boolean
}

export class Submit extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isBtnEnable: true,
    }
    this.eventsHub.registerSubmitStatusChange(this.setSubmitStatus)
  }

  setSubmitStatus = (enable: boolean) => {
    this.setState({
      isBtnEnable: enable,
    })
  }

  onClick = () => {
    this.eventsHub.verifyCode()
  }

  render() {
    let { isBtnEnable } = this.state
    return (
      <div className="smsv-submit-container">
        <Button disabled={isBtnEnable} onClick={this.onClick}>
          登陆
        </Button>
      </div>
    )
  }
}
