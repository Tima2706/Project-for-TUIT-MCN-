import type { CookieSetOptions } from 'universal-cookie'
import Cookies from 'universal-cookie'

export function useToken() {
  const cookies = new Cookies()
  const TOKEN_KEY = 'aa_key'
  const setToken = (token: string): string => {
    const options: CookieSetOptions = {
      path: '/',
    }

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
    cookies.remove(TOKEN_KEY, options)
  }



  return {
    setToken,
    getToken,
    removeToken,
  }
}
