import * as React from 'react'
import { Agreement } from './agreement'
import { CodeVerification } from './codeVerification'
import { ImageVerification } from './imageVerification'
import { PhoneNumber } from './phoneNumber'
import { Submit } from './submit'
import { ErrorMessage } from './errorMessage'
import { SmsvStore } from './smsvStore'
import './container.scss'
const cloneDeep = require('lodash.clonedeep')

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

const CodeDependency = [PhoneNumber, ImageVerification]

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

type ControlStatus = { isVerified: boolean; isCodeDependency: boolean }

export class Container extends React.Component<Props, State> {
  store = new SmsvStore()
  smsvControlStatusCache: {
    [key: string]: ControlStatus
  } = {}
  children: any[] = []
  phoneNumber = ''
  constructor(props: Props) {
    super(props)
    this.store.onSMSVStatusChange(this.onSMSVStatusChange)
    this.store.onSMSVFetchCode(this.onFetchCode)
    this.store.onVerifyCode(this.onVerifyCode)

    this.generateChildren()
  }
  state: State = {
    phoneNumber: '',
  }

  get smsvInfo() {
    const { phoneNumber, code } = this.store.state
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
        cloned.props.smsvStore = this.store
        cloned.props.componentKey = componentKey
        this.smsvControlStatusCache[componentKey] = {
          isVerified: false,
          isCodeDependency: CodeDependency.includes(cloned.type),
        }
      } else if (SMSVControls.includes(cloned.type)) {
        cloned.props.smsvStore = this.store
      }
      this.children.push(cloned)
    })
  }

  onFetchCode = async () => {
    const res = await this.props.onFetchCode(this.smsvInfo.phoneNumber)
    this.store.setErrorMessage(res)
  }

  onVerifyCode = async () => {
    const res = await this.props.onVerifyCode({
      phoneNumber: this.smsvInfo.phoneNumber,
      code: this.smsvInfo.code,
    })
    this.store.setErrorMessage(res)
  }

  onSMSVStatusChange = (enable: boolean, componentKey: string) => {
    this.smsvControlStatusCache[componentKey].isVerified = enable
    this.updateSubmitStatus()
    this.updateCodeControlStatus()
  }

  updateCodeControlStatus = () => {
    const isCodeDependencyDisable = !!Object.values(
      this.smsvControlStatusCache
    ).find(x => !x.isVerified && x.isCodeDependency)
    this.store.changeCodeVerificationStatus(!isCodeDependencyDisable)
  }

  updateSubmitStatus = () => {
    const isSubmitDisable = !!Object.values(this.smsvControlStatusCache).find(
      x => !x.isVerified
    )
    this.store.changeSubmitStatus(isSubmitDisable)
  }
  render() {
    return <div className="smsv-container">{this.children}</div>
  }
}
