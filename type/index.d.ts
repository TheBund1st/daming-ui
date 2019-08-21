import * as React from 'react'
import { Agreement } from './agreement'
import { CodeVerification } from './codeVerification'
import { ImageVerification } from './imageVerification'
import { PhoneNumber } from './phoneNumber'
import { Submit } from './submit'
import { ErrorMessage } from './errorMessage'
import { SmsvStore } from './smsvStore'
declare type Props = {
  onFetchCode: (phoneNumber: string) => Promise<string>
  onVerifyCode: (params: {
    phoneNumber: string
    code: string
  }) => Promise<string>
}
declare type State = {
  phoneNumber: string
}
declare type ControlStatus = {
  isVerified: boolean
  isCodeDependency: boolean
}
declare class Container extends React.Component<Props, State> {
  store: SmsvStore
  smsvControlStatusCache: {
    [key: string]: ControlStatus
  }
  children: any[]
  phoneNumber: string
  constructor(props: Props)
  state: State
  readonly smsvInfo: {
    code: string
    phoneNumber: string
  }
  generateChildren: () => void
  onFetchCode: () => Promise<void>
  onVerifyCode: () => Promise<void>
  onSMSVStatusChange: (enable: boolean, componentKey: string) => void
  updateCodeControlStatus: () => void
  updateSubmitStatus: () => void
  render(): JSX.Element
}
declare const _default: {
  Container: typeof Container
  Agreement: typeof Agreement
  CodeVerification: typeof CodeVerification
  ImageVerification: typeof ImageVerification
  PhoneNumber: typeof PhoneNumber
  Submit: typeof Submit
  ErrorMessage: typeof ErrorMessage
}
export default _default
