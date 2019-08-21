import { ReactNode } from 'react'
import { Component } from '../baseComponent'
declare type Props = {
  placeHolder?: string
  maxLength?: number
  prefix?: ReactNode
  suffix?: ReactNode
  errorTips?: string
  validation?: (phoneNum: string) => boolean
}
declare type State = {
  phoneNumber: string
  inputPhoneNumberErrorStatus: boolean
}
export declare class PhoneNumber extends Component<Props, State> {
  state: State
  static defaultProps: {
    placeHolder: string
    maxLength: number
    errorTips: string
    prefix: JSX.Element
    suffix: JSX.Element
    validation: (phoneNum: any) => boolean
  }
  onPhoneNumberChange: (event: any) => void
  onBlur: () => void
  render(): JSX.Element
}
export {}
