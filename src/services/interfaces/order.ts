import type { ContractItem } from '~/services/interfaces/contract'
import type { OrganizationItem } from '~/services/interfaces/organization'
import type { ProductItem } from '~/services/interfaces/product'
import type { UserItem } from '~/services/interfaces/user'

export type OrderStatus = 'InProgress' | 'CancelledBySeller' | 'ConclusionContract' | 'LeftRequestFromSeller' | 'CancelledByCustomer' | 'LeftRequestFromCustomer'

export interface OrderItem {
  product: ProductItem
  id: string
  customer: OrganizationItem
  seller: OrganizationItem
  requests: OrderRequestItem[]
  order_clearing: OrderOrder_clearingItem | null
  quantity: number
  price: number
  status: OrderStatus
  contract: ContractItem
}

export interface OrderOrder_clearingItem {
  id: string,
  created_by: string,
  is_customer_agree: boolean,
  is_seller_agree: boolean,
  created_at: string,
  updated_date: string,
  order_id: string
  status: ORDER_CLEARING_STATUS
}

type ORDER_CLEARING_STATUS = "CreatedByCustomer" | 'CreatedBySeller' | "Agreed" | 'IsSellerAgree'| "IsRejectedBySeller" | 'IsRejectedByCustomer'

export interface OrderRequestItem {
  price: string
  user?: UserItem
  id: string
  comment?: string
  is_request_from_customer: boolean
}

export interface LeaveOrderRequestReq {
  price: number
  orderId: number
  comment?: string
}
