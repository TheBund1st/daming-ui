import * as React from 'react'
import { SmsvStore } from './smsvStore'
export declare class Component<Props, State> extends React.Component<
  Props & {
    smsvStore?: SmsvStore
  },
  State
> {
  constructor(props: any)
  readonly smsvStore: (Props & {
    smsvStore?: SmsvStore
  })['smsvStore']
  readonly componentKey: string
}
