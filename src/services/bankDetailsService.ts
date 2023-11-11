import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { BankDetailsForm, BankDetailsInfo } from '~/types/bankDetails'

export const createBankDetails = async (form: BankDetailsForm) => {
  return await $http.post<BankDetailsInfo, AxiosResponse<BankDetailsForm>>('/organization/accounts', form)
}
export const updateBankDetails = async (form: BankDetailsForm, account: number | string) => {
  return await $http.put<BankDetailsInfo, AxiosResponse<BankDetailsForm>>(`/organization/accounts/${account}`, form)
}
export const deleteBankDetails = async (id: number) => {
  return await $http.delete(`/organization/accounts/${id}`)
}
export const getBankList = async () => {
  return await $http.get('/banks/list')
}
export const getOrganizationAccount = async () => {
  return await $http.get('/organization/accounts')
}
