import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { Organization } from '~/types'
import type { ProfileEdit, ProfileInfo } from '~/types/models/profile'

export const getProfileInfo = async (): Promise<AxiosResponse<Organization>> => {
  return await $http.get('/organization')
}
export const editProfileInfo = async (data: any) => {
  return await $http.put<ProfileEdit, AxiosResponse<ProfileInfo>>('/organization', data)
}
export const editProfileNotificationsNumber = async (data: any) => {
  return await $http.put<ProfileEdit, AxiosResponse<ProfileInfo>>('/organization/notification-numbers', data)
}
export const getProfileNotificationNumber = async (): Promise<AxiosResponse<Organization>> => {
  return await $http.get('/organization/notification-numbers')
}
