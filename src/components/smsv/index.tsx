import React, { Component } from 'react'
import { Agreement } from './agreement'
import { CodeVerification } from './codeVerification'
import { ImageVerification } from './imageVerification'
import { PhoneNumber } from './phoneNumber'
import { Submit } from './submit'
import * as authApi from '../../apis/auth'
import { EventsHub } from './eventsHub'
import { cloneDeep } from 'lodash-es'
import './index.scss'
const SMSVControls = [
  Agreement,
  CodeVerification,
  ImageVerification,
  PhoneNumber,
]

type Props = {
  fetchCodeApi: string
  verifyCodeApi: string
  scope: string
  callbackToken: (token: string) => void
}

type State = {
  phoneNumber: string
}

class Container extends Component<Props, State> {
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
    this.eventsHub.requestSMSVControlStatusCache(
      this.onRequestSMSVControlStatusCache
    )
    this.generateChildren()
  }
  state: State = {
    phoneNumber: '',
  }
  generateChildren = () => {
    ;(this.props.children as any).forEach((child, index) => {
      const cloned = cloneDeep(child)
      const componentKey = index
      cloned.key = componentKey
      if (SMSVControls.includes(cloned.type)) {
        cloned.props.eventsHub = this.eventsHub
        cloned.props.componentKey = componentKey
        this.smsvControlStatusCache[componentKey] = false
      } else if (cloned.type == Submit) {
        cloned.props.eventsHub = this.eventsHub
      }
      this.children.push(cloned)
    })
  }
  onRequestSMSVControlStatusCache = () => {
    return this.smsvControlStatusCache
  }
  onFetchCode = () => {
    console.log('onFetchCode')

    // authApi.fetchCode(this.props.fetchCodeApi, {
    //   mobile: '', //this.state.phoneNumber,
    //   scope: this.props.scope,
    // })
  }

  onVerifyCode = () => {
    authApi
      .verifyCode(this.props.verifyCodeApi, {
        mobile: '', //this.state.phoneNumber,
        scope: this.props.scope,
        code: '', //this.state.code,
      })
      .then(res => {
        this.props.callbackToken(res.data.token)
      })
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
    return <div className="daming-ui-container">{this.children}</div>
  }
}

export default {
  Container,
  Agreement,
  CodeVerification,
  ImageVerification,
  PhoneNumber,
  Submit,
}
