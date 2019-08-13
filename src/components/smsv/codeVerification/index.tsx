import React from 'react'
import { Component } from '../baseComponent'
import { Input, Button } from 'antd'
import './index.scss'
type Props = {}
type State = {
  codeVerification: string
  placeHolder: string
  codeVerificationBtnText: string
  isBtnEnable: boolean
}

export class CodeVerification extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.eventsHub.registerSendCodeStatusChange(this.sendCodeStatus)
  }
  state: State = {
    isBtnEnable: true,
    codeVerification: '',
    placeHolder: '输入验证码',
    codeVerificationBtnText: '获取验证码',
  }
  sendCodeStatus = (statusQueue: object) => {
    let statusKeeper = true
    for (let key in statusQueue) {
      if (key < this.componentKey) {
        statusKeeper = statusKeeper && statusQueue[key]
      }
    }
    this.setState({
      isBtnEnable: !statusKeeper,
    })
  }
  onCodeVerificationChange = event => {
    this.setState({ codeVerification: event.target.value })
  }
  onBlur = () => {
    console.log('onblur')
  }
  render() {
    const {
      codeVerification,
      placeHolder,
      codeVerificationBtnText,
      isBtnEnable,
    } = this.state
    return (
      <div className="smsv-code-verification-container">
        <Input
          value={codeVerification}
          placeholder={placeHolder}
          onChange={this.onCodeVerificationChange}
        />
        <Button type="primary" disabled={isBtnEnable}>
          {codeVerificationBtnText}
        </Button>
      </div>
    )
  }
}
