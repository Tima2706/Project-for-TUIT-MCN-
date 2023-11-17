import axios from 'axios'

import {API_BASE_URL, API_USER_URL} from '~/utils/config'
import { useToken } from '~/composables/useToken'
import { IS_DEV } from '~/utils/config'
const { getToken } = useToken()
const { gotoLogin } = useToken()

declare module 'axios' {
  export interface AxiosRequestConfig {
  }
}


export const $http = axios.create({
  baseURL: API_BASE_URL,
})

$http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (!IS_DEV) {
        gotoLogin()

      }
    }
    return Promise.reject(error)
  }
)
$http.interceptors.request.use((config) => {
  const token = getToken()
  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})

export const $httpUser = axios.create({
  baseURL: API_USER_URL,
})
$httpUser.interceptors.request.use((config) => {
  const token = getToken()
  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})
