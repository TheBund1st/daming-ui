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
}
