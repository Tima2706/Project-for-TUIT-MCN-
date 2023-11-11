import type { MiddlewareContext } from '~/types'
import { useToken } from '~/composables/useToken'

export default function authMiddleware({ next, routeNext, to }: MiddlewareContext) {
  const { getToken } = useToken()
  const token = getToken()
  if (!token)
    return routeNext({ name: 'auth-login', query: { next: to.fullPath } })
  return next()
}
