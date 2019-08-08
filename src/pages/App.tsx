import React, { Component } from 'react'
import smsv from '../components/smsv'

class App extends Component {
  onTokenBack = (token: string) => {
    console.log('token', token)
  }
  render() {
    return (
      <>
        <smsv.Container
          fetchCodeApi="api/sms/verification/code"
          verifyCodeApi="api/sms/verification/code"
          scope="ABC"
          callbackToken={this.onTokenBack}
        >
          <smsv.PhoneNumber />
          {/* <smsv.ImageVerification /> */}
          {/* <smsv.CodeVerification /> */}
          <smsv.Agreement />
          <smsv.Agreement />
          <smsv.Submit />
        </smsv.Container>

        <smsv.Container
          fetchCodeApi="api/sms/verification/code"
          verifyCodeApi="api/sms/verification/code"
          scope="ABC"
          callbackToken={this.onTokenBack}
        >
          <smsv.PhoneNumber />
          {/* <smsv.ImageVerification /> */}
          {/* <smsv.CodeVerification /> */}
          <smsv.Agreement />
          <smsv.Agreement />
          <smsv.Submit />
        </smsv.Container>
      </>
    )
  }
}

export default App
