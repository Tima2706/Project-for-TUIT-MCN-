import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { Organization, User } from '~/types'
import type { OrganizationUsersWithPagination } from '~/services/dto/organization.dto'

interface OrganizationResponse {
  organization: Organization
  permissions: string[]
}

interface CreateUserRequest {
  name: string
  password: string
  phone: string
  first_name?: string
  last_name?: string
  middle_name?: string
  passport_series?: string
  passport_number?: string
  passport_issue_date?: Date
}

interface UpdateUserRequest extends Partial<User> {}

export const getOrganizationData = () => {
  return $http.get<OrganizationResponse>('organization/profile')
}
export const getOrganizationList = () => {
  return $http.get<OrganizationResponse>('organization/list')
}
export const getOrganizationUsers = (params: any) => {
  return $http.get<OrganizationUsersWithPagination>('organization/users', {
    params,
  })
}

export const createUser = (data: CreateUserRequest) => {
  return $http.post<CreateUserRequest, AxiosResponse<User>>(
    'organization/users',
    data,
  )
}
export const createUserNotification = (data: any) => {
  return $http.post('organization/users/set-access-and-notification', data)
}

export const updateUser = (id: number, data: UpdateUserRequest) => {
  return $http.put(`organization/users/${id}`, data)
}

export const deleteUser = (id: number) => {
  return $http.delete(`organization/users/${id}`)
}
