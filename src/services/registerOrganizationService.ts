import { $http } from '~/services/baseHttp'
import type { ModuleItem } from '~/types/models/module'

export const registerOrganization = (payload: any) => {
  return $http.post('tmp-organization', payload)
}

export const addAccount = (payload: any) => {
  return $http.post('tmp-organization/add-account', payload)
}

export const addModule = (payload: any) => {
  return $http.post('tmp-organization/add-module', payload)
}

export const addNotificationNumber = (payload: any) => {
  return $http.post('tmp-organization/add-notification-number', payload)
}
export const getModules = () => {
  return $http.get<ModuleItem[]>('identify-service/modules')
}

export const getModuleRoles = () => {
  return $http.get<ModuleItem[]>('organization/users/roles')
}

export const saveOrganization = (payload: any) => {
  return $http.post('tmp-organization/save', payload)
}

export const checkOrganization = (tin: string) => {
  return $http.get(`tmp-organization/check/${tin}`)
}
