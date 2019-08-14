import * as React from 'react'
import { Component } from '../baseComponent'
import { Input, Icon } from 'antd'
import { VerificationCodeRender } from '../verificationCodeRender'
import './index.scss'
type Props = {
  codeLength?: number
}

type State = {
  verificationCode: string
  drawImageText: string
  errorTips: string
  inputImageNumberErrorStatus: boolean
  imageVerificationResult: boolean
}

export class ImageVerification extends Component<Props, State> {
  state: State = {
    verificationCode: '',
    drawImageText: '',
    errorTips: '验证码错误',
    inputImageNumberErrorStatus: false,
    imageVerificationResult: false,
  }

  static defaultProps = {
    codeLength: 4,
  }
  componentDidMount() {
    this.drawVerificationCode()
  }
  canvasRef = null
  getCanvasRef = ref => {
    this.canvasRef = ref
  }
  refreshImage = () => {
    let { verificationCode } = this.state
    let inputImageNumberErrorStatus = false
    if (verificationCode === '') {
      inputImageNumberErrorStatus = true
    }
    this.setState({
      inputImageNumberErrorStatus,
    })
    this.drawVerificationCode()
  }
  drawVerificationCode = () => {
    this.eventsHub.changeSMSVSendCodeStatus(false, this.componentKey)
    const verificationCodeRender = new VerificationCodeRender({
      targetCanvas: this.canvasRef,
      codeLen: this.props.codeLength,
      width: 100,
      height: 30,
    })
    let drawImageText = verificationCodeRender.drawVerificationCode()
    this.setState({
      drawImageText,
    })
  }
  onBlur() {
    let {
      verificationCode,
      drawImageText,
      inputImageNumberErrorStatus,
    } = this.state
    if (verificationCode.toLowerCase() === drawImageText.toLowerCase()) {
      inputImageNumberErrorStatus = false
    } else {
      inputImageNumberErrorStatus = true
    }
    this.eventsHub.changeSMSVSendCodeStatus(
      !inputImageNumberErrorStatus,
      this.componentKey
    )
    this.setState({
      inputImageNumberErrorStatus,
    })
  }
  onVerificationCodeChange = event => {
    const verificationCode = event.target.value
    let { drawImageText, inputImageNumberErrorStatus } = this.state
    let sendCodeStatus = false
    if (
      verificationCode.length === drawImageText.length &&
      verificationCode.toLowerCase() === drawImageText.toLowerCase()
    ) {
      inputImageNumberErrorStatus = false
      sendCodeStatus = true
    } else if (verificationCode.length < drawImageText.length) {
      inputImageNumberErrorStatus = false
    }
    this.eventsHub.changeSMSVSendCodeStatus(sendCodeStatus, this.componentKey)
    this.setState({
      verificationCode,
      inputImageNumberErrorStatus,
    })
  }
  render() {
    const {
      verificationCode,
      inputImageNumberErrorStatus,
      errorTips,
    } = this.state
    const { codeLength } = this.props
    return (
      <div className="smsv-image-number-container">
        <div className="smsv-input-canvas-container">
          <div className="smsv-input-container">
            <Input
              maxLength={codeLength}
              value={verificationCode}
              placeholder="请输入验证码"
              prefix={<Icon type="robot" />}
              onChange={this.onVerificationCodeChange}
              onBlur={() => {
                this.onBlur()
              }}
              className={
                inputImageNumberErrorStatus
                  ? 'smsv-image-number-error-input'
                  : ''
              }
            />
          </div>
          <div className="smsv-image-verification-action-container">
            <canvas
              id="smsv-image-verification-canvas"
              width="100px"
              height="30px"
              ref={this.getCanvasRef}
            />
            <div
              className="smsv-image-verification-refresh"
              onClick={this.refreshImage}
            >
              <Icon type="sync" />
            </div>
          </div>
        </div>
        {inputImageNumberErrorStatus && (
          <div className="smsv-image-number-error-tips">{errorTips}</div>
        )}
      </div>
    )
  }
}
