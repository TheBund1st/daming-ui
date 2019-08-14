import request from './request'
import { AxiosPromise } from 'axios'

export const fetchCode = (
  url: string,
  params: { mobile: string; scope: string }
): AxiosPromise<{
  hasError: boolean
  msg: string
  code: string
}> => request.post(url, params)

export const verifyCode = (
  url: string,
  params: {
    mobile: string
    scope: string
    code: string
  }
): AxiosPromise<{ hasError: boolean; msg: string; token: string }> =>
  request.post(url, params)
