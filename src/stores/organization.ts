import { acceptHMRUpdate, defineStore } from 'pinia'
import { getOrganizationData } from '~/services/organizationService'
import type { Organization } from '~/types'

export const useOrganizationStore = defineStore('organization', () => {
  const organization = ref<Organization | null>(null)
  const permissions = ref<string[]>([])

  const getOrganization = async () => {
    const { data } = await getOrganizationData()
    organization.value = data.organization
    permissions.value = data.permissions
  }

  const getUserPermissions = (): string[] => {
    if (permissions.value)
      return permissions.value

    return []
  }

  return {
    organization,
    getOrganization,
    getUserPermissions,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
