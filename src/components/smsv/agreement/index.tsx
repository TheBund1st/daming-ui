import * as React from 'react'
import { ReactNode } from 'react'
import { Component } from '../baseComponent'
import { Checkbox, Modal, Button } from 'antd'
import './index.scss'

type AgreementContent = {
  text: string
  openByNewTabUrl?: string
  openByPopupInfo?: {
    title: string
    content: ReactNode
    closeText?: string
    className?: any
  }
}

type Props = {
  preText: string
  agreements: AgreementContent[]
}

type State = {
  modalTitle: string
  modalContent: any
  modalCloseText: string
  modalClassName: any
  isModalVisible: boolean
  isAgreementChecked: boolean
}

export class Agreement extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalTitle: '',
      modalContent: null,
      modalCloseText: '',
      modalClassName: null,
      isModalVisible: false,
      isAgreementChecked: false,
    }
  }

  defaultModalCloseText = '关闭'

  onAgreeChange = () => {
    this.setState(
      prevState => ({
        isAgreementChecked: !prevState.isAgreementChecked,
      }),
      () => {
        this.eventsHub.changeSMSVStatus(
          this.state.isAgreementChecked,
          this.componentKey
        )
      }
    )
  }

  onAgreementContentClick = (content: AgreementContent) => {
    const openByPopupInfo = content.openByPopupInfo
    if (!!content.openByNewTabUrl) {
      ;(window as any).open(content.openByNewTabUrl)
    } else if (!!openByPopupInfo) {
      const { title, content, closeText, className } = openByPopupInfo
      this.setState({
        modalTitle: title,
        modalContent: content,
        modalClassName: className,
        isModalVisible: true,
        modalCloseText: closeText || this.defaultModalCloseText,
      })
    }
  }

  onModalClose = () => {
    this.setState({
      isModalVisible: false,
    })
  }

  render() {
    const { preText, agreements } = this.props
    const {
      modalTitle,
      modalContent,
      modalCloseText,
      modalClassName,
      isModalVisible,
      isAgreementChecked,
    } = this.state
    return (
      <div className="smsv-agreement-container">
        <Checkbox
          onChange={this.onAgreeChange}
          className="smsv-agreement-checkbox"
          checked={isAgreementChecked}
        />
        <Modal
          title={modalTitle}
          closable={true}
          maskClosable={true}
          className={modalClassName}
          visible={isModalVisible}
          onCancel={this.onModalClose}
          footer={<Button onClick={this.onModalClose}>{modalCloseText}</Button>}
        >
          {modalContent}
        </Modal>
        <span className="smsv-agreement-pretext" onClick={this.onAgreeChange}>
          {preText}
        </span>
        {agreements.map((x, index) => {
          return (
            <span
              className="smsv-agreement-text"
              onClick={this.onAgreementContentClick.bind(this, x)}
              key={index}
            >
              {x.text}
            </span>
          )
        })}
      </div>
    )
  }
}
