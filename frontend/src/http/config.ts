import axios from "axios"

export const api_url = "http://localhost:727/api"

const $api = axios.create({
  withCredentials: true,
  baseURL: api_url
})

$api.interceptors.request.use((config) => {
  config.headers!.authorization = `Bearer ${localStorage.getItem("token")}`
  return config
})

$api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const cfg = error.config
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    cfg._isRetry = true
    try {
      const response = await axios.get(`${api_url}/refresh`, {withCredentials: true})
      localStorage.setItem("token", response.data.refreshToken)
      return $api.request(cfg)
    } catch (e) {
      console.log("NOT AUTHED")
    }
  }
  throw error
})

export default $api;