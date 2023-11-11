import { $http } from '~/services/baseHttp'

export const getRolePermissions = () => {
  return $http.get('role/permissions')
}
