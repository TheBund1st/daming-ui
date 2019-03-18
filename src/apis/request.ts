import axios, { AxiosRequestConfig } from "axios"
const requestConfig = require("../request.config.json")

const request = axios.create({
  timeout: 10 * 1000
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
  config.url = `${requestConfig.http}://${requestConfig.host}:${
    requestConfig.port
  }/${config.url}`
  return config
})

export default request
