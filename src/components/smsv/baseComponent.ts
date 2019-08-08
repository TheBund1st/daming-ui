import React from 'react'
import { EventsHub } from './eventsHub'

export class Component<Props, State> extends React.Component<
  Props & { eventsHub?: EventsHub },
  State
> {
  constructor(props) {
    super(props)
  }

  get eventsHub() {
    return this.props.eventsHub
  }

  get componentKey() {
    return (this.props as any).componentKey as string
  }
}
