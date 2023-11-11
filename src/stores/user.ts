import { acceptHMRUpdate, defineStore } from 'pinia'
import { me } from '~/services/authorizationService'

interface User {
  permissions: string[]
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (u: any) => {
    user.value = u
  }

  const getUser = async () => {
    const { data } = await me()
    setUser(data)
  }

  return {
    user,
    setUser,
    getUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
