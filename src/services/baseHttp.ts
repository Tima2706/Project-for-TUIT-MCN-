import axios from 'axios'

import { API_BASE_URL } from '~/utils/config'
import { useToken } from '~/composables/useToken'
import { IS_DEV } from '~/utils/config'
// import {IDENTITY_SERVICE } from '~/utils/config'
const { getToken } = useToken()
const { gotoLogin } = useToken()

declare module 'axios' {
  export interface AxiosRequestConfig {
  }
}
// const username = 'username';
// const password = 'secret';
// const basicAuth = 'Basic ' + btoa(username + ':' + password)
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
