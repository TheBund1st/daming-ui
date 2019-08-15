import * as React from 'react'
import { Agreement } from './agreement'
import { CodeVerification } from './codeVerification'
import { ImageVerification } from './imageVerification'
import { PhoneNumber } from './phoneNumber'
import { Submit } from './submit'
import { ErrorMessage } from './errorMessage'
import { EventsHub } from './eventsHub'
import { cloneDeep } from 'lodash-es'

const SMSVControls = [
  Agreement,
  CodeVerification,
  ImageVerification,
  PhoneNumber,
  Submit,
  ErrorMessage,
]

const SMSVStateControls = [
  Agreement,
  CodeVerification,
  ImageVerification,
  PhoneNumber,
]

type Props = {
  onFetchCode: (phoneNumber: string) => Promise<string>
  onVerifyCode: (params: {
    phoneNumber: string
    code: string
  }) => Promise<string>
}

type State = {
  phoneNumber: string
}

class Container extends React.Component<Props, State> {
  eventsHub = new EventsHub()
  smsvControlStatusCache = {}
  children: any[] = []
  phoneNumber = ''
  constructor(props: Props) {
    super(props)
    this.eventsHub.registerSMSVStatusChange(this.onSMSVStatusChange)
    this.eventsHub.registerSMSVSendCodeStatusChange(
      this.onSMSVSendCodeStatusChange
    )
    this.eventsHub.registerSMSVFetchCode(this.onFetchCode)
    this.eventsHub.onVerifyCode(this.onVerifyCode)
    this.eventsHub.requestSMSVControlStatusCache(
      this.onRequestSMSVControlStatusCache
    )
    this.generateChildren()
  }
  state: State = {
    phoneNumber: '',
  }

  get smsvInfo() {
    const { phoneNumber, code } = this.eventsHub.events
    return {
      code,
      phoneNumber,
    }
  }

  generateChildren = () => {
    ;(this.props.children as any).forEach((child, index) => {
      const cloned = cloneDeep(child)
      const componentKey = index
      cloned.key = componentKey
      if (SMSVStateControls.includes(cloned.type)) {
        cloned.props.eventsHub = this.eventsHub
        cloned.props.componentKey = componentKey
        this.smsvControlStatusCache[componentKey] = false
      } else if (SMSVControls.includes(cloned.type)) {
        cloned.props.eventsHub = this.eventsHub
      }
      this.children.push(cloned)
    })
  }
  onRequestSMSVControlStatusCache = () => {
    return this.smsvControlStatusCache
  }
  onFetchCode = async () => {
    const res = await this.props.onFetchCode(this.smsvInfo.phoneNumber)
    this.eventsHub.setErrorMessage(res)
  }

  onVerifyCode = async () => {
    const res = await this.props.onVerifyCode({
      phoneNumber: this.smsvInfo.phoneNumber,
      code: this.smsvInfo.code,
    })
    this.eventsHub.setErrorMessage(res)
  }
  onSMSVSendCodeStatusChange = (enable: boolean, componentKey: string) => {
    this.smsvControlStatusCache[componentKey] = enable
    this.eventsHub.ChangeSendCodeStatusChange(this.smsvControlStatusCache)
  }
  onSMSVStatusChange = (enable: boolean, componentKey: string) => {
    this.smsvControlStatusCache[componentKey] = enable
    this.updateSubmitStatus()
  }

  updateSubmitStatus = () => {
    const isSubmitDisable = Object.values(this.smsvControlStatusCache).includes(
      false
    )
    this.eventsHub.changeSubmitStatus(isSubmitDisable)
  }
  render() {
    return <div className="smsv-container">{this.children}</div>
  }
}

export default {
  Container,
  Agreement,
  CodeVerification,
  ImageVerification,
  PhoneNumber,
  Submit,
  ErrorMessage,
}
