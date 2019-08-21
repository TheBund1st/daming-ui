export declare class SmsvStore {
  state: State
  onSubmitStatusChange(onChange: any): void
  changeSubmitStatus(enable: boolean): void
  onSMSVStatusChange(onChange: any): void
  changeSMSVStatus(enable: boolean, componentKey: string): void
  changePhoneNumber(phoneNumber: string): void
  changeCode(code: string): void
  onCodeVerificationStatusChange(onChange: any): void
  changeCodeVerificationStatus(enable: boolean): void
  onSMSVFetchCode(onChange: any): void
  fetchSMSVCode(): void
  onVerifyCode(event: any): void
  verifyCode(): void
  onErrorMessage(event: any): void
  setErrorMessage(msg: string): void
}
