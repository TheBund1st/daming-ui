import axios, { AxiosError } from 'axios'

const request = axios.create({
  timeout: 10 * 1000,
})

request.interceptors.response.use(
  config => {
    return config
  },
  (error: AxiosError) => {
    return {
      hasError: true,
      error: error.toString(),
    }
  }
)

export default request
