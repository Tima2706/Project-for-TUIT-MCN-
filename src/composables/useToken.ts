import type { CookieSetOptions } from 'universal-cookie'
import Cookies from 'universal-cookie'
import { IS_DEV } from '~/utils/config'
export function useToken() {
  const cookies = new Cookies(null)
  const TOKEN_KEY = 'auth_key'
  const setToken = (token: string, expires: number): string => {
    const options: CookieSetOptions = {
      path: '/',
    }
    if (!IS_DEV)
      options.domain = '.dt.uz'

    if (expires)
      options.expires = new Date(expires)

    cookies.set(TOKEN_KEY, token, options)
    localStorage.setItem(TOKEN_KEY, token)
    return token
  }

  const getToken = (): string | null => {
    return cookies.get(TOKEN_KEY) || null
  }

  const removeToken = () => {
    const options: Record<string, string> = {
      path: '/',
    }
    if (!IS_DEV)
      options.domain = '.dt.uz'

    cookies.remove(TOKEN_KEY, options)

    localStorage.removeItem(TOKEN_KEY)
  }
  const setTokenFromCookie = (token?: string) => {
    if (token)
      localStorage.setItem(TOKEN_KEY, token)
  }

  return {
    setToken,
    getToken,
    removeToken,
    setTokenFromCookie,
    TOKEN_KEY,
  }
}
