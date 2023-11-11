import type { OrganizationItem } from '~/services/interfaces/organization'

export type ContractStatus = 'Created' | 'Closed' | 'SignedByCustomer' | 'SignedBySeller' | 'CancelledByCustomer' | 'CancelledBySeller'

export interface AllowedUserItem {
  is_customer: boolean
  contract_id: number
  id: number
  name: string
  tin: string
}

export interface ContractSign {
  is_customer: boolean
  id: number
  name: string
  document: string
  created_at: string
}

export interface ContractDocument {
  path: string
  id: number
}
export interface ContractItem {
  id: number
  comments: ContractComment[]
  document: ContractDocument
  signs: ContractSign[]
  customer: OrganizationItem
  seller: OrganizationItem
  allowed_users: AllowedUserItem[]
  status: ContractStatus
  created_at: string
}

export interface ContractComment {
  organization: {
    id: number
    name: string
  }
  comment: string
  id: number
  created_at: string
}

export interface ContractCommentCreateRequest {
  contractId: string
  comment: string
}

export interface FormState {
  reason: string
}
