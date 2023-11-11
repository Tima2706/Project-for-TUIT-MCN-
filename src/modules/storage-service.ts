import { LANGUAGES_KEY_FOR_STORAGE } from '~/utils/constants'

export const useStorageService = () => {
  const setToStorage = (value: any) => {
    if (typeof value !== 'string')
      localStorage.setItem(LANGUAGES_KEY_FOR_STORAGE, JSON.stringify(value))
    else
      localStorage.setItem(LANGUAGES_KEY_FOR_STORAGE, value)
  }

  const getFromStorage = (fallback?: any) => {
    const value = localStorage.getItem(LANGUAGES_KEY_FOR_STORAGE)
    if (value) {
      try {
        return JSON.parse(value)
      }
      catch (_e) {
        return value
      }
    }
    return fallback || null
  }

  return {
    $set: setToStorage,
    $get: getFromStorage,
  }
}
