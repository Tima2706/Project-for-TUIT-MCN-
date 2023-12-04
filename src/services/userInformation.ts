import { $http } from '~/services/baseHttp'

export const getUserInfo = async () => {
  return await $http.get('/profile')
}
