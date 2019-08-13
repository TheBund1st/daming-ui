type Events = {
  phoneNumber: string
  onSubmitStatusChange: (enable: boolean) => void
  onSMSVStatusChange: (enable: boolean, component: string) => void
  onPhoneNumberChange: (phoneNumber: string) => void
  onImageVerificationChange: (enable: boolean, componentKey: string) => void
}
