import React, { Component } from "react"
import { Input, Button } from "antd"
import * as authApi from "../../apis/auth"

const style = require("./index.scss")

type Props = {
  fetchCodeApi: string
  verifyCodeApi: string
  scope: string
  callbackToken: (token: string) => void
}

type State = {
  phoneNumber: string
  code: string
}

class SMS_Verification extends Component<Props, State> {
  state: State = {
    phoneNumber: "",
    code: ""
  }

  onPhoneNumberChange = event => {
    this.setState({ phoneNumber: event.target.value })
  }
  onCodeChange = event => {
    this.setState({ code: event.target.value })
  }
  onFetchCode = () => {
    authApi.fetchCode(this.props.fetchCodeApi, {
      mobile: this.state.phoneNumber,
      scope: this.props.scope
    })
  }

  onVerifyCode = () => {
    authApi
      .verifyCode(this.props.verifyCodeApi, {
        mobile: this.state.phoneNumber,
        scope: this.props.scope,
        code: this.state.code
      })
      .then(res => {
        this.props.callbackToken(res.data.token)
      })
  }

  render() {
    const { phoneNumber, code } = this.state
    return (
      <div className={style.wrapper}>
        <Input className={style.row} onChange={this.onPhoneNumberChange} value={phoneNumber} placeholder="电话号码"/>
        <div className={style.row}>
          <Input onChange={this.onCodeChange} value={code} placeholder="验证码"/>
          <Button onClick={this.onFetchCode}>获取验证码</Button>
        </div>
        <Button className={style.row} onClick={this.onVerifyCode}>提交验证</Button>
      </div>
    )
  }
}

export default SMS_Verification
