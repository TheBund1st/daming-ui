import React from "react"
import { Component } from "../baseComponent"
import { Input, Icon } from "antd"
import "./index.scss"
type Props = {
  codeLength: number
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
    verificationCode: "",
    drawImageText: "",
    errorTips: "验证码错误",
    inputImageNumberErrorStatus: false,
    imageVerificationResult: false
  }

  static defaultProps = {
    codeLength: 4
  }
  componentDidMount() {
    this.drawVerificationCode()
  }
  canvasRef = null
  getCanvasRef = ref => {
    this.canvasRef = ref
  }
  onBlur() {
    const { verificationCode, drawImageText } = this.state
    if (verificationCode.toLowerCase() === drawImageText.toLowerCase()) {
      this.setState({
        inputImageNumberErrorStatus: false
      })
      return
    }
    this.setState({
      inputImageNumberErrorStatus: true
    })
  }
  onVerificationCodeChange = event => {
    this.setState({ verificationCode: event.target.value })
  }

  drawVerificationCode() {
    const { codeLength } = this.props
    const { verificationCode } = this.state
    function getRandomNumber(min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
    function getRandomColor(min, max) {
      let r = getRandomNumber(min, max)
      let g = getRandomNumber(min, max)
      let b = getRandomNumber(min, max)
      return `rgb(${r},${g},${b})`
    }
    let w = 100
    let h = 25
    let ctx = this.canvasRef.getContext("2d")
    ctx.fillStyle = getRandomColor(180, 230)
    ctx.fillRect(0, 0, w, h)
    let pool = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefhijkmnpqrstuvwxyz234568"
    let drawText = [],
      drawImageText = ""
    for (let i = 0; i < codeLength; i++) {
      let randomText = pool[getRandomNumber(0, pool.length)]
      drawText.push(randomText)
      drawImageText += randomText.toLowerCase()
    }
    this.setState({ drawImageText }, () => {
      if (verificationCode !== "") {
        this.onBlur()
      }
    })
    for (let i = 0; i < 4; i++) {
      let fs = getRandomNumber(18, 24)
      let deg = getRandomNumber(-30, 30)
      ctx.font = fs + "px Simhei"
      ctx.fontWeight = 600
      ctx.textBaseline = "top"
      ctx.fillStyle = getRandomColor(80, 150)
      ctx.save()
      ctx.translate((100 / codeLength) * i + 15, 15)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(drawText[i], -10, -15)
      ctx.restore()
    }
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(getRandomNumber(0, w), getRandomNumber(0, h))
      ctx.lineTo(getRandomNumber(0, w), getRandomNumber(0, h))
      ctx.strokeStyle = getRandomColor(180, 230)
      ctx.closePath()
      ctx.stroke()
    }
    for (let i = 0; i < 40; i++) {
      ctx.beginPath()
      ctx.arc(getRandomNumber(0, w), getRandomNumber(0, h), 1, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = getRandomColor(150, 200)
      ctx.fill()
    }
  }
  render() {
    const {
      verificationCode,
      inputImageNumberErrorStatus,
      errorTips
    } = this.state
    const { codeLength } = this.props
    return (
      <div className="smsv-image-number-container">
        <Input
          maxLength={codeLength}
          value={verificationCode}
          placeholder="请输入验证码"
          prefix={<Icon type="robot" />}
          suffix={
            <div className="smsv-image-vesication-action-container">
              <canvas
                id="smsv-image-vesication-canvas"
                width="100px"
                height="25px"
                ref={this.getCanvasRef}
              />
              <Icon
                type="sync"
                className="smsv-image-vesication-refresh"
                onClick={() => {
                  this.drawVerificationCode()
                }}
              />
            </div>
          }
          onChange={this.onVerificationCodeChange}
          onBlur={() => {
            this.onBlur()
          }}
          className={
            inputImageNumberErrorStatus ? "smsv-image-number-error-input" : ""
          }
        />
        {inputImageNumberErrorStatus && (
          <div className="smsv-image-number-error-tips">{errorTips}</div>
        )}
      </div>
    )
  }
}
