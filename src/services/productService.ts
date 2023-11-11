import { $http } from '~/services/baseHttp'
import type { ProductAttributes, ProductDto } from '~/services/dto'

export const getProductsList = async (params: Record<string, string | number>) => {
  return await $http.get('/product', { params })
}

export const getProductById = async (id: string) => {
  return await $http.get<ProductDto>(`/product/${id}`)
}
export const getAttributesList = async (id: number) => {
  return await $http.get<Array<ProductAttributes>>(`product/attributes/list/by-category/${id}`)
}
export const getMeasuresList = async () => {
  return await $http.get('/product/measures')
}
export const createProducts = async (form: FormData) => {
  return await $http.post('/product', form)
}
export const updateProducts = async (id: number, form: FormData) => {
  return await $http.put(`/product/${id}`, form)
}

export const deleteProduct = async (id: number) => {
  return await $http.delete(`/product/${id}`)
}
