type Events = {
  phoneNumber: string
  code: string
  onSubmitStatusChange: (enable: boolean) => void
  onSMSVStatusChange: (enable: boolean, component: string) => void
  onSMSVSendCodeStatusChange: (enable: boolean, component: string) => void
  onPhoneNumberChange: (phoneNumber: string) => void
  onSendCodeStatusChange: (statusQueue: object) => void
  fetchSMSVCode: () => void
  verifySMSVCode: () => void
  onRequestSMSVControlStatusCache: () => object
}
