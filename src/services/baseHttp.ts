import axios from 'axios'

import { API_BASE_URL } from '~/utils/config'
import { useToken } from '~/composables/useToken'

const { getToken } = useToken()

declare module 'axios' {
  export interface AxiosRequestConfig {
  }
}

export const $http = axios.create({
  baseURL: API_BASE_URL,
  headers: {

  },
})

$http.interceptors.request.use((config) => {
  const token = getToken()
  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
})
