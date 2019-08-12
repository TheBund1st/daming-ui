import React, { Component } from 'react'
import smsv from '../components/smsv'
import './App.scss'
class App extends Component {
  onTokenBack = (token: string) => {
    console.log('token', token)
  }
  render() {
    return (
      <>
        <div className="smsv-container">
          <smsv.Container
            fetchCodeApi="api/sms/verification/code"
            verifyCodeApi="api/sms/verification/code"
            scope="ABC"
            callbackToken={this.onTokenBack}
          >
            <smsv.PhoneNumber />
            <smsv.ImageVerification />
            <smsv.CodeVerification />
            <smsv.Agreement />
            <smsv.Agreement />
            <smsv.Submit />
          </smsv.Container>
        </div>
        {/* <smsv.Container
          fetchCodeApi="api/sms/verification/code"
          verifyCodeApi="api/sms/verification/code"
          scope="ABC"
          callbackToken={this.onTokenBack}
        >
          <smsv.PhoneNumber /> */}
        {/* <smsv.ImageVerification /> */}
        {/* <smsv.CodeVerification /> */}
        {/* <smsv.Agreement />
          <smsv.Agreement />
          <smsv.Submit />
        </smsv.Container> */}
      </>
    )
  }
}

export default App
