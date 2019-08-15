import * as React from 'react'
import { Component } from '../baseComponent'

type Props = {}

type State = {
  error: string
}

export class ErrorMessage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.eventsHub.onErrorMessage(this.setErrorMessage)
    this.state = {
      error: '',
    }
  }

  setErrorMessage = error => {
    this.setState({
      error,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="smsv-error-message-container">{this.state.error}</div>
      )
    } else {
      return <div />
    }
  }
}
