import React from "react"
import { Component } from "../baseComponent"
import { Input, Button } from "antd"
import "./index.scss"
type Props = {}
type State = {
  codeVerification: string
  placeHolder: string
  codeVerificationBtnText: string
}

export class CodeVerification extends Component<Props, State> {
  state: State = {
    codeVerification: "",
    placeHolder: "输入验证码",
    codeVerificationBtnText: "获取验证码"
  }
  onCodeVerificationChange = event => {
    this.setState({ codeVerification: event.target.value })
  }
  onBlur = () => {
    console.log("onblur")
  }
  render() {
    const {
      codeVerification,
      placeHolder,
      codeVerificationBtnText
    } = this.state
    return (
      <div className="smsv-code-verification-container">
        <Input
          value={codeVerification}
          placeholder={placeHolder}
          onChange={this.onCodeVerificationChange}
        />
        <Button type="primary" disabled={true}>
          {codeVerificationBtnText}
        </Button>
      </div>
    )
  }
}
