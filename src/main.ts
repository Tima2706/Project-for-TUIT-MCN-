import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types/types'
import generatedRoutes from '~pages'

import './styles/main.scss'
import { useMiddleware } from '~/router'
import { $http } from '~/services/baseHttp'
import { useOrganizationStore } from '~/stores/organization'
import { useToken } from '~/composables/useToken'

const routes = setupLayouts(generatedRoutes)
const {  getToken } = useToken()

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  async (ctx) => {
    useMiddleware(ctx.router)

    $http.interceptors.response.use((response) => {
      return response
    }, (error) => {
      if (error.response.status === 401) {
        // removeToken()
        // ctx.router.replace({ name: 'auth-login' })
      }

      return Promise.reject(error)
    })

    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach((i) => {
        i.install?.(ctx)
      })
    const { getOrganization } = useOrganizationStore()
    const token = getToken()
    if (token) {
      await getOrganization().catch(() => {
        // eslint-disable-next-line no-console
        console.log('Token was expired')
        // setTimeout(() => {
        //   ctx.router.replace({ name: 'auth-login' })
        //   removeToken()
        // })
      })
    }

    // ctx.app.use(Previewer)
  },
)
