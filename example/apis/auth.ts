import request from './request'

export const fetchCode = (
  url: string,
  params: { mobile: string; scope: string }
) => request.post(url, params)

export const verifyCode = (
  url: string,
  data: {
    mobile: string
    scope: string
    code: string
  }
) => request.delete(url, { data })
