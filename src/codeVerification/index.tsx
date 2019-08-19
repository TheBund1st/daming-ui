import * as React from 'react'
import { Component } from '../baseComponent'
import { Input, Button } from 'antd'
import './index.scss'
type Props = {
  limitClickInterval: number
}
type State = {
  codeVerification: string
  placeHolder: string
  codeVerificationBtnText: string
  errorTips: string
  isBtnEnable: boolean
  inputCodeVerificationErrorStatus: boolean
  limitClickInterval: number
}
export class CodeVerification extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.eventsHub.registerSendCodeStatusChange(this.sendCodeStatus)
  }
  static defaultProps = {
    limitClickInterval: 3,
  }
  state: State = {
    isBtnEnable: true,
    inputCodeVerificationErrorStatus: false,
    codeVerification: '',
    placeHolder: '输入验证码',
    errorTips: '输入验证码',
    codeVerificationBtnText: '获取验证码',
    limitClickInterval: this.props.limitClickInterval,
  }
  sendCodeStatus = (statusQueue: object) => {
    const { limitClickInterval } = this.state
    let statusKeeper = true
    statusKeeper = limitClickInterval === this.props.limitClickInterval
    for (let key in statusQueue) {
      if (key < this.componentKey) {
        statusKeeper = statusKeeper && statusQueue[key]
      }
    }
    this.setState({
      isBtnEnable: !statusKeeper,
    })
  }
  sendCode = () => {
    const { isBtnEnable, limitClickInterval } = this.state
    if (!isBtnEnable) {
      this.setState(
        {
          codeVerificationBtnText: `${limitClickInterval}秒后重试`,
          isBtnEnable: true,
          limitClickInterval: this.props.limitClickInterval,
        },
        () => {
          this.setBtnText()
          this.eventsHub.fetchSMSVCode()
        }
      )
    }
  }
  setBtnText = () => {
    let { limitClickInterval } = this.state
    limitClickInterval--
    setTimeout(() => {
      this.setState({
        codeVerificationBtnText: `${limitClickInterval}秒后重试`,
        limitClickInterval,
      })
      if (limitClickInterval === 0) {
        this.setState({
          codeVerificationBtnText: '获取验证码',
        })
        this.sendCodeStatus(this.eventsHub.sendSMSVControlStatusCache())
      } else {
        this.setBtnText()
      }
    }, 1000)
  }
  onCodeVerificationChange = event => {
    const code = event.target.value.trim()
    this.setState({
      codeVerification: code,
      inputCodeVerificationErrorStatus: code === '',
    })
    this.eventsHub.changeCode(code)
    this.eventsHub.changeSMSVStatus(code !== '', this.componentKey)
  }
  onBlur = () => {
    const { codeVerification } = this.state
    let inputCodeVerificationErrorStatus = codeVerification === ''
    this.setState({
      inputCodeVerificationErrorStatus,
    })
    if (inputCodeVerificationErrorStatus) {
      this.eventsHub.changeCode('')
    } else {
      this.eventsHub.changeCode(codeVerification)
    }
  }
  render() {
    const {
      codeVerification,
      placeHolder,
      codeVerificationBtnText,
      isBtnEnable,
      inputCodeVerificationErrorStatus,
      errorTips,
    } = this.state
    return (
      <div className="smsv-code-verification-container">
        <div className="smsv-code-verification-action-container">
          <Input
            value={codeVerification}
            placeholder={placeHolder}
            onChange={this.onCodeVerificationChange}
          />
          <Button type="primary" disabled={isBtnEnable} onClick={this.sendCode}>
            {codeVerificationBtnText}
          </Button>
        </div>
        {inputCodeVerificationErrorStatus && (
          <div className="smsv-code-verification-error-tips">{errorTips}</div>
        )}
      </div>
    )
  }
}
