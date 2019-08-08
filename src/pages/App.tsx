import React, { Component } from 'react'
import {
  SMSV,
  Agreement,
  CodeVerification,
  ImageVerification,
  PhoneNumber,
  Submit,
} from '../components/smsv'

class App extends Component {
  onTokenBack = (token: string) => {
    console.log('token', token)
  }
  render() {
    return (
      <SMSV
        fetchCodeApi="api/sms/verification/code"
        verifyCodeApi="api/sms/verification/code"
        scope="ABC"
        callbackToken={this.onTokenBack}
      >
        <PhoneNumber />
        <ImageVerification />
        <CodeVerification />
        <Agreement />
        <Agreement />
        <Submit />
      </SMSV>
    )
  }
}

export default App
