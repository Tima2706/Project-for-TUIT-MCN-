import { $http } from '~/services/baseHttp'

export const getCategories = async () => {
  return await $http.get('/lists/categories')
}
export const getBrands = async () => {
  return await $http.get('/lists/brands')
}
export const getColors = async () => {
  return await $http.get('/lists/colors')
}
export const getMeasures = async () => {
  return await $http.get('/lists/measures')
}
export const getTNvedCodes = async () => {
  return await $http.get('/lists/tnved-codes')
}
