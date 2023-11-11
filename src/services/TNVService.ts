import { $http } from '~/services/baseHttp'
import type { TNV } from '~/types'

export const createTnv = async (form: TNV) => {
  return await $http.post<TNV>('/tnved-codes', form)
}
