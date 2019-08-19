import axios from 'axios'

const request = axios.create({
  timeout: 10 * 1000,
})

// request.interceptors.request.use((config: AxiosRequestConfig) => {
//   console.log("url", config.url)
//   return config
// })

export default request
