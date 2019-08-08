// link分为弹出和新页面两种
import React from 'react'
import { Component } from '../baseComponent'
import { Checkbox } from 'antd'

type Props = {}

type State = {}

export class Agreement extends Component<Props, State> {
  onAgreeChange = ({ target: { checked } }) => {
    this.eventsHub.changeSMSVStatus(checked, this.componentKey)
  }

  render() {
    return (
      <div>
        <Checkbox onChange={this.onAgreeChange} />
        Agreement
      </div>
    )
  }
}
