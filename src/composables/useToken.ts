import type { CookieSetOptions } from 'universal-cookie'
import Cookies from 'universal-cookie'
import { IS_DEV } from '~/utils/config'

export function useToken() {
  const cookies = new Cookies()
  const TOKEN_KEY = 'aa_key'
  const DOMAIN = '.dt.uz'
  const setToken = (token: string): string => {
    const options: CookieSetOptions = {
      path: '/',
    }
    if (!IS_DEV)
      options.domain = DOMAIN

    cookies.set(TOKEN_KEY, token, options)
    return token
  }

  const getToken = (): string | null => {
    return cookies.get(TOKEN_KEY)
  }

  const removeToken = () => {
    const options: CookieSetOptions = {
      path: '/',
    }
    if (!IS_DEV)
      options.domain = DOMAIN
    cookies.remove(TOKEN_KEY, options)
  }

  return {
    setToken,
    getToken,
    removeToken,
  }
}
