import { ReactNode } from 'react'
import { Component } from '../baseComponent'
declare type AgreementContent = {
  text: string
  openByNewTabUrl?: string
  openByPopupInfo?: {
    title: string
    content: ReactNode
    closeText?: string
    className?: any
  }
}
declare type Props = {
  preText: string
  agreements: AgreementContent[]
}
declare type State = {
  modalTitle: string
  modalContent: any
  modalCloseText: string
  modalClassName: any
  isModalVisible: boolean
  isAgreementChecked: boolean
}
export declare class Agreement extends Component<Props, State> {
  constructor(props: Props)
  defaultModalCloseText: string
  onAgreeChange: () => void
  onAgreementContentClick: (content: AgreementContent) => void
  onModalClose: () => void
  render(): JSX.Element
}
export {}
