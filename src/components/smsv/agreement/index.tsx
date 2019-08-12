// link分为弹出和新页面两种
import React, { ReactNode } from 'react'
import { Component } from '../baseComponent'
import { Checkbox } from 'antd'
import './index.scss'
type Props = {
  ChildrenComponents: ReactNode
}

type State = {}

export class Agreement extends Component<Props, State> {
  state: State = {
    phoneNumber: '',
    inputPhoneNumberErrorStatus: false,
  }

  static defaultProps = {
    ChildrenComponents: <div>smsv-agreement-container</div>,
  }
  onAgreeChange = ({ target: { checked } }) => {
    this.eventsHub.changeSMSVStatus(checked, this.componentKey)
  }

  render() {
    const { ChildrenComponents } = this.props
    return (
      <div className="smsv-agreement-container">
        <div className="smsv-agreement-container-checkbox">
          <Checkbox onChange={this.onAgreeChange} />
        </div>
        <div className="smsv-agreement-container-children-node">
          {ChildrenComponents}
        </div>
      </div>
    )
  }
}
