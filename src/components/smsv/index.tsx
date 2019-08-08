import React, { Component } from 'react'

export { Agreement } from './agreement'
export { CodeVerification } from './codeVerification'
export { ImageVerification } from './imageVerification'
export { PhoneNumber } from './phoneNumber'
export { Submit } from './submit'
import * as authApi from '../../apis/auth'

type Props = {
  fetchCodeApi: string
  verifyCodeApi: string
  scope: string
  callbackToken: (token: string) => void
}

type State = {}

export class SMSV extends Component<Props, State> {
  onFetchCode = () => {
    // authApi.fetchCode(this.props.fetchCodeApi, {
    //   mobile: this.state.phoneNumber,
    //   scope: this.props.scope,
    // })
  }

  onVerifyCode = () => {
    // authApi
    //   .verifyCode(this.props.verifyCodeApi, {
    //     mobile: this.state.phoneNumber,
    //     scope: this.props.scope,
    //     code: this.state.code,
    //   })
    //   .then(res => {
    //     this.props.callbackToken(res.data.token)
    //   })
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
