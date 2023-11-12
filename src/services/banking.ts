import { $http } from '~/services/baseHttp'

const username = 'username'
const password = 'secret'
const credentials = btoa(`${username}:${password}`)
const basicAuth = `Basic ${credentials}`
export const getBanks = async (
  params: Record<string, string | number>,
  id: string,
) => {
  return await $http.get('operations-search', {
    params,
    headers: { Authorization: basicAuth },
  })
}
