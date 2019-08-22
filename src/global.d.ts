type State = {
  phoneNumber: string
  code: string
  onSubmitStatusChange: (enable: boolean) => void
  onSMSVStatusChange: (enable: boolean, component: string) => void
  onSendCodeStatusChange: (enable: boolean) => void
  fetchSMSVCode: () => void
  verifySMSVCode: () => void
  onResponseErrorMessage: (msg: string) => void
}
