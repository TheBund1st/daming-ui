import * as React from 'react'
import { Component } from '../baseComponent'
import { Input, Button } from 'antd'
import './index.scss'
type Props = {
  fetchCodeIntervalSecond?: number
  codeLen?: number
  config?: {
    errorMsg?: {
      emptyCode: string
      lengthMismatch: string
    }
  }
}
type State = {
  codeVerification: string
  placeHolder: string
  codeVerificationBtnText: string
  errorTips: string
  isBtnDisable: boolean
  inputCodeVerificationErrorStatus: boolean
}
export class CodeVerification extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.smsvStore.onCodeVerificationStatusChange(this.sendCodeStatus)
  }
  static defaultProps = {
    fetchCodeIntervalSecond: 3,
    codeLen: 4,
    config: {
      errorMsg: {
        emptyCode: '请输入验证码',
        lengthMismatch: '验证码长度无效',
      },
    },
  }
  state: State = {
    isBtnDisable: true,
    inputCodeVerificationErrorStatus: false,
    codeVerification: '',
    placeHolder: '输入验证码',
    errorTips: '输入验证码',
    codeVerificationBtnText: '获取验证码',
  }

  intervalLeftSecond = 0
  intervalInstance = null
  resetInterval = () => {
    this.intervalLeftSecond = this.props.fetchCodeIntervalSecond
    this.intervalInstance && clearInterval(this.intervalInstance)
    this.setState({
      codeVerificationBtnText: '获取验证码',
      isBtnDisable: !this.isCodeDependencyEnable,
    })
  }

  setInterval = () => {
    this.intervalLeftSecond = this.props.fetchCodeIntervalSecond
    this.setState({
      isBtnDisable: true,
      codeVerificationBtnText: `${this.intervalLeftSecond--}秒后重试`,
    })
    this.intervalInstance = setInterval(() => {
      this.setState({
        codeVerificationBtnText: `${this.intervalLeftSecond--}秒后重试`,
      })
      if (this.intervalLeftSecond == -1) {
        this.resetInterval()
      }
    }, 1000)
  }

  isCodeDependencyEnable = false
  sendCodeStatus = (enable: boolean) => {
    this.isCodeDependencyEnable = enable
    enable && this.resetInterval()
  }
  sendCode = () => {
    const { isBtnDisable } = this.state
    if (!isBtnDisable) {
      this.smsvStore.fetchSMSVCode()
      this.setInterval()
    }
  }

  onCodeVerificationChange = event => {
    const {
      config: { errorMsg },
    } = this.props
    const code = event.target.value.trim()
    let errorTips = ''
    if (code === '') {
      errorTips = errorMsg.emptyCode
    } else if (code.length !== this.props.codeLen) {
      errorTips = errorMsg.lengthMismatch
    }
    const inputCodeVerificationErrorStatus =
      code === '' || code.length !== this.props.codeLen
    this.setState({
      codeVerification: code,
      inputCodeVerificationErrorStatus,
      errorTips,
    })
    this.smsvStore.changeCode(code)
    this.smsvStore.changeSMSVStatus(
      !inputCodeVerificationErrorStatus,
      this.componentKey
    )
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
      isBtnDisable,
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
          <Button
            type="primary"
            disabled={isBtnDisable}
            onClick={this.sendCode}
          >
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
