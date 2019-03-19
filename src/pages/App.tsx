import React, { Component } from "react"
import SMS_Verification from "../components/sms-verification/index"

class App extends Component {
  onTokenBack = (token: string) => {
    console.log("token", token)
  }
  render() {
    return (
      <div>
        <SMS_Verification
          fetchCodeApi="api/sms/verification/code"
          verifyCodeApi="api/sms/verification/code"
          scope="ABC"
          callbackToken={this.onTokenBack}
        />
      </div>
    )
  }
}

export default App
