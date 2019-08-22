export class SmsvStore {
  state = {} as State
  onSubmitStatusChange(onChange) {
    this.state.onSubmitStatusChange = onChange
  }
  changeSubmitStatus(enable: boolean) {
    this.state.onSubmitStatusChange && this.state.onSubmitStatusChange(enable)
  }
  onSMSVStatusChange(onChange) {
    this.state.onSMSVStatusChange = onChange
  }
  changeSMSVStatus(enable: boolean, componentKey: string) {
    this.state.onSMSVStatusChange &&
      this.state.onSMSVStatusChange(enable, componentKey)
  }
  changePhoneNumber(phoneNumber: string) {
    this.state.phoneNumber = phoneNumber
  }
  changeCode(code: string) {
    this.state.code = code
  }
  onCodeVerificationStatusChange(onChange) {
    this.state.onSendCodeStatusChange = onChange
  }
  changeCodeVerificationStatus(enable: boolean) {
    this.state.onSendCodeStatusChange &&
      this.state.onSendCodeStatusChange(enable)
  }
  onSMSVFetchCode(onChange) {
    this.state.fetchSMSVCode = onChange
  }
  fetchSMSVCode() {
    this.state.fetchSMSVCode && this.state.fetchSMSVCode()
  }
  onVerifyCode(event) {
    this.state.verifySMSVCode = event
  }
  verifyCode() {
    this.state.verifySMSVCode && this.state.verifySMSVCode()
  }
  onErrorMessage(event) {
    this.state.onResponseErrorMessage = event
  }
  setErrorMessage(msg: string) {
    this.state.onResponseErrorMessage && this.state.onResponseErrorMessage(msg)
  }
}
