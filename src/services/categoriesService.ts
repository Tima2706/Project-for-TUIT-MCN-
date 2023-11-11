import { $http } from '~/services/baseHttp'
import type { CategoryData } from '~/services/dto/categories.dto'

export const getCategoryList = async () => {
  return await $http.get<Array<CategoryData>>('/category/list')
}
export const getCategoryListWithPagination = async (params: Record<string, any>) => {
  return await $http.get('/category', params)
}

export const createCategory = async (form: FormData) => {
  return await $http.post('/category', form)
}

export const updateCategory = async (id: number, form: FormData) => {
  return await $http.put(`/category/${id}`, form)
}

export const deleteCategory = async (id: number) => {
  return await $http.delete(`/category/${id}`)
}
