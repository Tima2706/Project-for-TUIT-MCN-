import { $http } from '~/services/baseHttp'
import type { PaginationData } from '~/services/interfaces/common'
import type { ContractCommentCreateRequest, ContractItem, FormState } from '~/services/interfaces/contract'
import { API_FILE_URL } from '~/utils/config'

export const getContracts = (params: any) => {
  return $http.get<PaginationData<ContractItem>>('contracts', { params })
}
export const getContractExcel = (params: any) => {
  return $http.get<Blob>('contracts/export/excel', { params, responseType: 'blob' })
}

export const getContractById = (id: string) => {
  return $http.get<ContractItem>(`contracts/${id}`)
}

export const leaveComment = (c: ContractCommentCreateRequest) => {
  return $http.post('contracts/comment', c)
}

export const signContract = (c: any) => {
  return $http.post('contracts/sign', c)
}

export const getContentOfContract = async (id: string) => {
  return $http.get(`/contracts/content/${id}`)
}

export const updateContractContent = (id: string, body: unknown) => {
  return $http.put(`contracts/content/${id}`, body)
}

export const sendChangedHtmlDocument = async (id: string, html: string) => {
  return $http.put(`/contracts/content/${id}`, { content: html })
}

export const getContractDocumentAsUrl = async (url: string): Promise<string> => {
  const { data } = await $http.get<File>(`${API_FILE_URL}/${url}`, { responseType: 'blob' })
  const fileReader = new FileReader()
  fileReader.readAsDataURL(data)
  return new Promise((resolve) => {
    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }
  })
}

export const getContractInfoView = (id: string) => {
  return $http.get<ContractItem>(`pub/contract/view/${id}`)
}

export const refuseContract = (c: FormState, id: string) => {
  return $http.post(`/contracts/cancel/${id}`, c)
}
