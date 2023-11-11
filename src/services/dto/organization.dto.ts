import type { User } from '~/types'
import type { ItemsWithPagination } from '~/services/dto/global.dto'

export interface OrganizationUser {
  firstname: string
  lastname: string
  surname: string
  user: User
}

export interface OrganizationUsersWithPagination extends ItemsWithPagination<OrganizationUser> {}
