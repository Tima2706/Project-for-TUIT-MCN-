import { useOrganizationStore } from '~/stores/organization'

export const useAccess = () => {
  const { getUserPermissions } = useOrganizationStore()
  const permissions = getUserPermissions()

  const hasAccess = (permission: string): boolean => {
    return permissions.includes(permission)
  }

  return {
    hasAccess,
  }
}
