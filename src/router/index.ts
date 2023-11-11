import type { Router } from 'vue-router'

import * as NProgress from 'nprogress'
import routes from 'pages-generated'
import authMiddleware from './middleware/authMiddleware'
import organizationMiddleware from './middleware/organizationMiddleware'
import middlewarePipeline from './middlewarePipeline'
import type { TRouteMiddleware } from '~/types'
import { useUserStore } from '~/stores/user'
import { useOrganizationStore } from '~/stores/organization'
import permissionMiddleware from '~/router/middleware/permissionMiddleware'

export function useMiddleware(router: Router) {
  const middlewaresIndex: Record<TRouteMiddleware, any> = {
    authMiddleware,
    organizationMiddleware,
    permissionMiddleware,
  }

  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const middlewareList = to.meta.middleware as TRouteMiddleware[]
    if (!middlewareList || !middlewareList.length) {
      NProgress.done()
      return next()
    }
    const middlewares = middlewareList.map((item) => {
      return middlewaresIndex[item]
    })

    const context = {
      to,
      from,
      next,
      routeNext: next,
      store: {
        userStore: useUserStore(),
        organizationStore: useOrganizationStore(),
      },
    }
    NProgress.done()
    return await middlewares[0]({
      ...context,
      next: middlewarePipeline(context, middlewares, 1),
    })
  })

  return routes
}
