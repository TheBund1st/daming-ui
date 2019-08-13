// post url
// enable by other component
import React from 'react'
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

  render() {
    let { isBtnEnable } = this.state
    return (
      <div className="smsv-submit-button-container">
        <Button disabled={isBtnEnable}>登陆</Button>
      </div>
    )
  }
}
