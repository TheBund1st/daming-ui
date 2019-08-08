type Events = {
  onSubmitStatusChange: (enable: boolean) => void
  onSMSVStatusChange: (enable: boolean, component: string) => void
}