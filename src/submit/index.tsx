import * as React from 'react'
import { Component } from '../baseComponent'
import { Button } from 'antd'

type Props = {
  btnText: string
}

type State = {
  isBtnEnable: boolean
}

export class Submit extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isBtnEnable: true,
    }
    this.smsvStore.onSubmitStatusChange(this.setSubmitStatus)
  }

  setSubmitStatus = (enable: boolean) => {
    this.setState({
      isBtnEnable: enable,
    })
  }

  onClick = () => {
    this.smsvStore.verifyCode()
  }

  render() {
    let { isBtnEnable } = this.state
    let { btnText = '登录' } = this.props
    return (
      <div className="smsv-submit-container">
        <Button disabled={isBtnEnable} onClick={this.onClick}>
          {btnText}
        </Button>
      </div>
    )
  }
}
