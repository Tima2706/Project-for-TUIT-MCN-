import axios from 'axios'

import { API_BASE_URL } from '~/utils/config'
import { useToken } from '~/composables/useToken'

const { getToken } = useToken()

declare module 'axios' {
  export interface AxiosRequestConfig {
  }
}
const username = 'username';
const password = 'secret';
const basicAuth = 'Basic ' + btoa(username + ':' + password)
export const $http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': basicAuth
  },
})

$http.interceptors.request.use((config) => {
  const token = getToken()
  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})
