export class EventsHub {
  events: Events = {} as any
  registerSubmitStatusChange(onChange) {
    this.events.onSubmitStatusChange = onChange
  }
  changeSubmitStatus(enable: boolean) {
    this.events.onSubmitStatusChange && this.events.onSubmitStatusChange(enable)
  }
  registerSMSVStatusChange(onChange) {
    this.events.onSMSVStatusChange = onChange
  }
  changeSMSVStatus(enable: boolean, componentKey: string) {
    this.events.onSMSVStatusChange &&
      this.events.onSMSVStatusChange(enable, componentKey)
  }
  changePhoneNumber(phoneNumber: string) {
    this.events.phoneNumber = phoneNumber
  }
  changeCode(code: string) {
    this.events.code = code
  }
  registerSendCodeStatusChange(onChange) {
    this.events.onSendCodeStatusChange = onChange
  }
  ChangeCodeVerificationStatus(enable: boolean) {
    this.events.onSendCodeStatusChange &&
      this.events.onSendCodeStatusChange(enable)
  }
  registerSMSVFetchCode(onChange) {
    this.events.fetchSMSVCode = onChange
  }
  fetchSMSVCode() {
    this.events.fetchSMSVCode && this.events.fetchSMSVCode()
  }
  onVerifyCode(event) {
    this.events.verifySMSVCode = event
  }
  verifyCode() {
    this.events.verifySMSVCode && this.events.verifySMSVCode()
  }
  onErrorMessage(event) {
    this.events.onResponseErrorMessage = event
  }
  setErrorMessage(msg: string) {
    this.events.onResponseErrorMessage &&
      this.events.onResponseErrorMessage(msg)
  }
}
