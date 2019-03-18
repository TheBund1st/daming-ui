import request from "./request"

export const fetchCode = (params: { mobile: string; scope: string }) =>
  request.post("api/sms/verification/code", params)

export const verifyCode = (params: {
  mobile: string
  scope: string
  code: string
}) => request.delete("api/sms/verification/code", { params })
