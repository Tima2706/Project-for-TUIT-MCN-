import type { MiddlewareContext } from '~/types'

export default async function organizationMiddleware({ next }: MiddlewareContext) {
  return next()
}
