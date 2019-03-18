import React, { Component } from "react"
import { Input, Button } from "antd"
import * as authApi from "../apis/auth"

const style = require("./App.scss")

type State = {
  phoneNumber: string
  code: string
}

class App extends Component<{}, State> {
  state: State = {
    phoneNumber: "",
    code: ""
  }

  scope = "ABC"

  onPhoneNumberChange = event => {
    this.setState({ phoneNumber: event.target.value })
  }
  onCodeChange = event => {
    this.setState({ code: event.target.value })
  }
  onFetchCode = () => {
    authApi.fetchCode({ mobile: this.state.phoneNumber, scope: this.scope })
  }

  onVerifyCode = () => {
    authApi.verifyCode({
      mobile: this.state.phoneNumber,
      scope: this.scope,
      code: this.state.code
    })
  }

  render() {
    const { phoneNumber, code } = this.state
    return (
      <div className={style.App}>
        <Input onChange={this.onPhoneNumberChange} value={phoneNumber} />
        <div className={style.row}>
          <Input onChange={this.onCodeChange} value={code} />
          <Button onClick={this.onFetchCode}>获取验证码</Button>
        </div>
        <Button onClick={this.onVerifyCode}>提交验证</Button>
        <div />
      </div>
    )
  }
}

export default App
