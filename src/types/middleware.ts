import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { useUserStore } from '~/stores/user'
import type { useOrganizationStore } from '~/stores/organization'

export type TRouteMiddleware =
  | 'authMiddleware'
  | 'organizationMiddleware'
  | 'permissionMiddleware'

interface RouteStore {
  userStore: ReturnType<typeof useUserStore>
  organizationStore: ReturnType<typeof useOrganizationStore>
}

export interface MiddlewareContext {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
  routeNext: NavigationGuardNext
  store: RouteStore
}
