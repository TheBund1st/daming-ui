import * as React from 'react'
import { SmsvStore } from './smsvStore'

export class Component<Props, State> extends React.Component<
  Props & { smsvStore?: SmsvStore },
  State
> {
  constructor(props) {
    super(props)
  }

  get smsvStore() {
    return this.props.smsvStore
  }

  get componentKey() {
    return (this.props as any).componentKey as string
  }
}
