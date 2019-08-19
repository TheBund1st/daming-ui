import * as React from 'react'
import { Component } from '../baseComponent'
import { Input, Button } from 'antd'
import './index.scss'
type Props = {
  limitClickInterval: number
  codeLen: number
  config?: {
    errorMsg1: ''
  }
}
type State = {
  codeVerification: string
  placeHolder: string
  codeVerificationBtnText: string
  errorTips: string
  isBtnEnable: boolean
  inputCodeVerificationErrorStatus: boolean
  limitClickInterval: number
  setBtnTextTimeOut: any
}
export class CodeVerification extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.eventsHub.registerSendCodeStatusChange(this.sendCodeStatus)
  }
  static defaultProps = {
    limitClickInterval: 3,
    codeLen: 4,
  }
  state: State = {
    isBtnEnable: true,
    inputCodeVerificationErrorStatus: false,
    codeVerification: '',
    placeHolder: '输入验证码',
    errorTips: '输入验证码',
    codeVerificationBtnText: '获取验证码',
    limitClickInterval: this.props.limitClickInterval,
    setBtnTextTimeOut: null,
  }
  sendCodeStatus = (statusQueue: object) => {
    const { setBtnTextTimeOut } = this.state
    let statusKeeper = true
    for (let key in statusQueue) {
      if (key < this.componentKey) {
        statusKeeper = statusKeeper && statusQueue[key]
      }
    }
    if (statusKeeper) {
      if (setBtnTextTimeOut) {
        this.setState(
          {
            setBtnTextTimeOut: null,
            codeVerificationBtnText: '获取验证码',
            limitClickInterval: this.props.limitClickInterval,
          },
          () => {
            clearTimeout(setBtnTextTimeOut)
          }
        )
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
    let { limitClickInterval, setBtnTextTimeOut } = this.state
    limitClickInterval--
    setBtnTextTimeOut = setTimeout(() => {
      this.setState({
        codeVerificationBtnText: `${limitClickInterval}秒后重试`,
        limitClickInterval,
      })
      if (limitClickInterval === 0) {
        this.setState({
          codeVerificationBtnText: '获取验证码',
          limitClickInterval: this.props.limitClickInterval,
        })
        this.sendCodeStatus(this.eventsHub.sendSMSVControlStatusCache())
      } else {
        this.setBtnText()
      }
    }, 1000)
    this.setState({
      setBtnTextTimeOut,
    })
  }
  onCodeVerificationChange = event => {
    const code = event.target.value.trim()
    let errorTips = ''
    if (code === '') {
      errorTips = '请输入正确的验证码'
    } else if (code.length > this.props.codeLen) {
      errorTips = '验证码错误'
    }
    this.setState({
      codeVerification: code,
      setBtnTextTimeOut: null,
      inputCodeVerificationErrorStatus:
        code === '' || code.length > this.props.codeLen,
      errorTips,
    })
    this.eventsHub.changeCode(code)
    this.eventsHub.changeSMSVStatus(code !== '', this.componentKey)
  }
  onBlur = () => {
    const { codeVerification } = this.state
    this.onCodeVerificationChange({ target: { value: codeVerification } })
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
            onBlur={this.onBlur}
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
