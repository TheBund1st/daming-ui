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
  registerSMSVSendCodeStatusChange(onChange) {
    this.events.onSMSVSendCodeStatusChange = onChange
  }
  changeSMSVSendCodeStatus(enable: boolean, componentKey: string) {
    this.events.onSMSVSendCodeStatusChange &&
      this.events.onSMSVSendCodeStatusChange(enable, componentKey)
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
  ChangeSendCodeStatusChange(statusQueue: object) {
    this.events.onSendCodeStatusChange &&
      this.events.onSendCodeStatusChange(statusQueue)
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
  requestSMSVControlStatusCache(onRequest) {
    this.events.onRequestSMSVControlStatusCache = onRequest
  }
  sendSMSVControlStatusCache() {
    return (
      this.events.onRequestSMSVControlStatusCache &&
      this.events.onRequestSMSVControlStatusCache()
    )
  }
  onErrorMessage(event) {
    this.events.onResponseErrorMessage = event
  }
  setErrorMessage(msg: string) {
    this.events.onResponseErrorMessage &&
      this.events.onResponseErrorMessage(msg)
  }
}
