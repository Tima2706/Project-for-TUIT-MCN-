import type { MiddlewareContext } from '~/types'
import { PERMISSIONS } from '~/utils/constants'

export default function permissionMiddleware({
  next,
  routeNext,
  to,
  from,
  store,
}: MiddlewareContext) {
  const permissions = store.organizationStore.getUserPermissions()

  const requiredPermissionPages: Record<string, string> = {
    'users': PERMISSIONS.EMPLOYEE_VIEW,
    'product': PERMISSIONS.PRODUCT_VIEW,
    'contract': PERMISSIONS.CONTRACT_VIEW,
    'contract-id': PERMISSIONS.CONTRACT_VIEW,
    'basket': PERMISSIONS.ORDER_VIEW,
    'basket-id': PERMISSIONS.ORDER_VIEW,
    'accept-basket': PERMISSIONS.ORDER_VIEW,
    'accept-basket-id': PERMISSIONS.ORDER_VIEW,
    'profile-edit': PERMISSIONS.ORGANIZATION_PROFILE_EDIT,
  }
  const pageName = to.name as string

  if (!requiredPermissionPages[pageName])
    return next()

  if (!permissions.includes(requiredPermissionPages[pageName]))
    return routeNext({ name: 'forbidden' })
  return next()
}
