export class EventsHub {
  events: Events = {} as any

  registerSubmitStatusChange(onChange) {
    this.events.onSubmitStatusChange = onChange
  }
  registerSMSVStatusChange(onChange) {
    this.events.onSMSVStatusChange = onChange
  }
  changeSubmitStatus(enable: boolean) {
    this.events.onSubmitStatusChange && this.events.onSubmitStatusChange(enable)
  }
  changeSMSVStatus(enable: boolean, componentKey: string) {
    this.events.onSMSVStatusChange &&
      this.events.onSMSVStatusChange(enable, componentKey)
  }
  changePhoneNumber(phoneNumber: string) {
    this.events.onPhoneNumberChange &&
      this.events.onPhoneNumberChange(phoneNumber)
  }
  registerSMSVPhoneNumberChange(onChange) {
    this.events.onPhoneNumberChange = onChange
  }
  changeImageVerification(enable: boolean, componentKey: string) {
    this.events.onImageVerificationChange &&
      this.events.onImageVerificationChange(enable, componentKey)
  }
  registerImageVerificationChange(onChange) {
    this.events.onImageVerificationChange = onChange
  }
  registerSendCodeStatusChange(onChange) {
    this.events.onSendCodeStatusChange = onChange
  }
  ChangeSendCodeStatusChange(statusQueue: object) {
    this.events.onSendCodeStatusChange &&
      this.events.onSendCodeStatusChange(statusQueue)
  }
}
