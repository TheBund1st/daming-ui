import request from "./request"
import { AxiosPromise } from "axios"

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
): AxiosPromise<{ token: string }> =>
  request.delete(url, { data })
