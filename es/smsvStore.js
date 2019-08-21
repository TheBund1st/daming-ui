var SmsvStore = /** @class */ (function() {
  function SmsvStore() {
    this.state = {}
  }
  SmsvStore.prototype.onSubmitStatusChange = function(onChange) {
    this.state.onSubmitStatusChange = onChange
  }
  SmsvStore.prototype.changeSubmitStatus = function(enable) {
    this.state.onSubmitStatusChange && this.state.onSubmitStatusChange(enable)
  }
  SmsvStore.prototype.onSMSVStatusChange = function(onChange) {
    this.state.onSMSVStatusChange = onChange
  }
  SmsvStore.prototype.changeSMSVStatus = function(enable, componentKey) {
    this.state.onSMSVStatusChange &&
      this.state.onSMSVStatusChange(enable, componentKey)
  }
  SmsvStore.prototype.changePhoneNumber = function(phoneNumber) {
    this.state.phoneNumber = phoneNumber
  }
  SmsvStore.prototype.changeCode = function(code) {
    this.state.code = code
  }
  SmsvStore.prototype.onCodeVerificationStatusChange = function(onChange) {
    this.state.onSendCodeStatusChange = onChange
  }
  SmsvStore.prototype.changeCodeVerificationStatus = function(enable) {
    this.state.onSendCodeStatusChange &&
      this.state.onSendCodeStatusChange(enable)
  }
  SmsvStore.prototype.onSMSVFetchCode = function(onChange) {
    this.state.fetchSMSVCode = onChange
  }
  SmsvStore.prototype.fetchSMSVCode = function() {
    this.state.fetchSMSVCode && this.state.fetchSMSVCode()
  }
  SmsvStore.prototype.onVerifyCode = function(event) {
    this.state.verifySMSVCode = event
  }
  SmsvStore.prototype.verifyCode = function() {
    this.state.verifySMSVCode && this.state.verifySMSVCode()
  }
  SmsvStore.prototype.onErrorMessage = function(event) {
    this.state.onResponseErrorMessage = event
  }
  SmsvStore.prototype.setErrorMessage = function(msg) {
    this.state.onResponseErrorMessage && this.state.onResponseErrorMessage(msg)
  }
  return SmsvStore
})()
export { SmsvStore }
