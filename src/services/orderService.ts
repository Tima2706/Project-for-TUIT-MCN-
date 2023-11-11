import type {AxiosResponse} from 'axios'
import {$http} from '~/services/baseHttp'
import type {PaginationData} from '~/services/interfaces/common'
import type {LeaveOrderRequestReq, OrderItem, OrderRequestItem} from '~/services/interfaces/order'

interface CreateContractReq {
    orderId: number
    documentId: number
}

export const getOrderRequests = (params?: Record<string, string | number | boolean>) => {
    return $http.get<PaginationData<OrderItem>>('order', {params})
}
export const getOrderInfoById = (id: string) => {
    return $http.get<OrderItem & { requests: OrderRequestItem[] }>(`order/${id}`)
}

export const leaveOrderRequest = (o: LeaveOrderRequestReq) => {
    return $http.post<LeaveOrderRequestReq, AxiosResponse<LeaveOrderRequestReq & {
        id: number
    }>>('order/order-request-by-seller', o)
}

export const leaveOrderRequestAsCustomer = (o: LeaveOrderRequestReq) => {
    return $http.post<LeaveOrderRequestReq>('order/order-request-by-customer', o)
}

export const getBasketOrders = (params?: Record<string, any>) => {
    return $http.get<PaginationData<OrderItem>>('order/basket', {params})
}

export const cancelOrderBySeller = (orderId: string) => {
    return $http.post<PaginationData<OrderItem>>('order/cancel-by-seller', {
        orderId,
    })
}

export const toggleClearing = (order_id: string) => {
    return $http.post('order/toggle-clearing', {
        order_id,
    })
}

export const createOrder = (data: CreateContractReq) => {
    return $http.post<PaginationData<OrderItem>>('order/contract', data)
}

export const acceptOrderByCustomer = (orderId: string) => {
    return $http.post<PaginationData<OrderItem>>('order/accept-by-customer', {
        orderId,
    })
}

export const cancelOrderByCustomer = (orderId: string) => {
    return $http.post<PaginationData<OrderItem>>('order/cancel-by-customer', {
        orderId,
    })
}


// ====================================== Order Cleaning ==================================

export const acceptCleaningSeller = (order_id: string) => {
    return $http.post<PaginationData<OrderItem>>('order/accept-clearing-seller', {
        order_id,
    })
}
export const cancelCleaningSeller = (order_id: string) => {
    return $http.post<PaginationData<OrderItem>>('order/cancel-clearing-seller', {
        order_id,
    })
}
export const acceptCleaningCustomer = (order_id: string) => {
    return $http.post<PaginationData<OrderItem>>('order/accept-clearing-customer', {
        order_id,
    })
}
export const cancelCleaningCustomer = (order_id: string) => {
    return $http.post<PaginationData<OrderItem>>('order/cancel-clearing-customer', {
        order_id,
    })
}

