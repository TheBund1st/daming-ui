import React, { ReactNode } from 'react'
import { Component } from '../baseComponent'
import { Input, Icon } from 'antd'
import './index.scss'
type Props = {
  placeHolder?: string
  maxLength?: number
  prefix?: ReactNode
  suffix?: ReactNode
  errorTips?: string
  validation?: (phoneNum: string) => boolean
}

type State = {
  phoneNumber: string
  inputPhoneNumberErrorStatus: boolean
}

export class PhoneNumber extends Component<Props, State> {
  state: State = {
    phoneNumber: '',
    inputPhoneNumberErrorStatus: false,
  }

  static defaultProps = {
    placeHolder: '请输入手机号码',
    maxLength: 20,
    errorTips: '手机号码格式有误',
    prefix: <Icon type="mobile" />,
    suffix: <span>请填写接收验证码的手机号码</span>,
    validation: phoneNum => {
      let status = false
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNum)) {
        status = true
      }
      return status
    },
  }
  onPhoneNumberChange = event => {
    const { maxLength } = this.props
    let phoneNumber = event.target.value
    if (phoneNumber.length > maxLength) {
      phoneNumber = phoneNumber.slice(0, maxLength)
    }
    const { validation } = this.props
    const inputPhoneNumberErrorStatus = validation(phoneNumber)
    this.setState({ phoneNumber })
    this.eventsHub.changeSMSVStatus(
      !inputPhoneNumberErrorStatus,
      this.componentKey
    )
    if (!inputPhoneNumberErrorStatus) {
      this.eventsHub.changePhoneNumber(phoneNumber)
    } else {
      this.eventsHub.changePhoneNumber('')
    }
  }
  onBlur = event => {
    const { phoneNumber } = this.state
    const { validation } = this.props
    const inputPhoneNumberErrorStatus = validation(phoneNumber)
    this.setState({ inputPhoneNumberErrorStatus })
  }
  render() {
    const { phoneNumber, inputPhoneNumberErrorStatus } = this.state
    const { placeHolder, maxLength, prefix, suffix, errorTips } = this.props
    return (
      <div className="smsv-phone-number-container">
        <Input
          type="number"
          maxLength={maxLength}
          value={phoneNumber}
          placeholder={placeHolder}
          prefix={prefix}
          suffix={suffix}
          onChange={this.onPhoneNumberChange}
          onBlur={this.onBlur}
          className={
            inputPhoneNumberErrorStatus ? 'smsv-phone-number-error-input' : ''
          }
        />
        {inputPhoneNumberErrorStatus && (
          <div className="smsv-phone-number-error-tips">{errorTips}</div>
        )}
      </div>
    )
  }
}
