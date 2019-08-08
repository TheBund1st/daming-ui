// number verify
// icon
import React from 'react'
import { Component } from '../baseComponent'
import { Input } from 'antd'

type Props = {}

type State = {
  phoneNumber: string
}

export class PhoneNumber extends Component<Props, State> {
  state: State = {
    phoneNumber: '',
  }

  onPhoneNumberChange = event => {
    this.setState({ phoneNumber: event.target.value })
    if (event.target.value) {
      this.eventsHub.changeSMSVStatus(true, this.componentKey)
    } else {
      this.eventsHub.changeSMSVStatus(false, this.componentKey)
    }
  }

  render() {
    const { phoneNumber } = this.state
    return (
      <div>
        <Input
          onChange={this.onPhoneNumberChange}
          value={phoneNumber}
          placeholder="电话号码"
        />
      </div>
    )
  }
}
