/// <reference types="react" />
import { Component } from '../baseComponent'
declare type Props = {
  fetchCodeIntervalSecond: number
  codeLen: number
  config?: {
    errorMsg?: {
      emptyCode: string
      lengthMismatch: string
    }
  }
}
declare type State = {
  codeVerification: string
  placeHolder: string
  codeVerificationBtnText: string
  errorTips: string
  isBtnDisable: boolean
  inputCodeVerificationErrorStatus: boolean
}
export declare class CodeVerification extends Component<Props, State> {
  constructor(props: Props)
  static defaultProps: {
    fetchCodeIntervalSecond: number
    codeLen: number
    config: {
      errorMsg: {
        emptyCode: string
        lengthMismatch: string
      }
    }
  }
  state: State
  intervalLeftSecond: number
  intervalInstance: any
  resetInterval: () => void
  setInterval: () => void
  isCodeDependencyEnable: boolean
  sendCodeStatus: (enable: boolean) => void
  sendCode: () => void
  onCodeVerificationChange: (event: any) => void
  onBlur: () => void
  render(): JSX.Element
}
export {}
