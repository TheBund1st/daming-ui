import React from 'react'

export { Agreement } from './agreement'
export { CodeVerification } from './codeVerification'
export { ImageVerification } from './imageVerification'
export { PhoneNumber } from './phoneNumber'
export { Submit } from './submit'

export const SMSV = props => {
  return <div>{props.children}</div>
}
