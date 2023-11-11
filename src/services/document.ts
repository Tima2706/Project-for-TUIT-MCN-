import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { PaginationData } from '~/services/interfaces/common'

interface DocumentTemplate {
  name: string
  id: number
  created_at: string
  updated_at: string
  author: string
}

export interface DocumentTemplateCategory {
  name: string
  id: number
  documents: DocumentTemplate[]
}

export const getDocuments = (): Promise<AxiosResponse<PaginationData<DocumentTemplateCategory>>> => {
  return $http.get('documents')
}
