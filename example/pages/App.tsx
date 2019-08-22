import * as React from 'react'
import './App.scss'
import { Button } from 'antd'
import { DefaultDemo } from '../demos/DefaultDemo'
import { CostaDemo } from '../demos/CostaDemo'
import * as authApi from '../apis/auth'
type Props = {}

type State = {
  demoType: string
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  state: State = {
    demoType: 'demo',
  }
  onFetchCode = async phoneNumber => {
    const res: any = await authApi.fetchCode('api/sms/verification/code', {
      scope: 'ABC',
      mobile: phoneNumber,
    })
    if (res.hasError) {
      return res.error
    } else {
      return ''
    }
  }

  onVerifyCode = async params => {
    const res: any = await authApi.verifyCode('api/sms/verification/code', {
      scope: 'ABC',
      mobile: params.phoneNumber,
      code: params.code,
    })
    if (res.hasError) {
      return res.error
    } else {
      return ''
    }
  }
  handleDemoChange = e => {
    this.setState(
      {
        demoType: e.target.value,
      },
      () => {
        this.renderDemo()
      }
    )
  }
  renderDemo = () => {
    const { demoType } = this.state
    switch (demoType) {
      case 'demo':
        return (
          <DefaultDemo
            onFetchCode={this.onFetchCode}
            onVerifyCode={this.onVerifyCode}
          />
        )
      case 'costa-demo':
        return (
          <CostaDemo
            onFetchCode={this.onFetchCode}
            onVerifyCode={this.onVerifyCode}
          />
        )
    }
  }

  render() {
    const { demoType } = this.state
    return (
      <>
        <div className="container">
          <div className="demo-list-controler">
            <Button
              type={demoType === 'demo' ? 'primary' : 'default'}
              value="demo"
              onClick={this.handleDemoChange}
            >
              demo
            </Button>
            <Button
              type={demoType === 'costa-demo' ? 'primary' : 'default'}
              value="costa-demo"
              onClick={this.handleDemoChange}
            >
              costa-demo
            </Button>
          </div>
          <div className="demo-container">{this.renderDemo()}</div>
        </div>
      </>
    )
  }
}

export default App
