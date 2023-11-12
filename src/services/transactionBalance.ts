import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { TransactionBalance } from '~/services/dto/transcationBalance'

export const getTransactionBalance = (params: Record<any, any>): Promise<
  AxiosResponse<TransactionBalance>
> => {
  return $http.get('organization-balances?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748')
}

export const getOrganizationPartner = () => {
    return $http.get('organizations')
}
export const organizationWuthdrawal = (id: string) => {
    return $http.get('organization-bank-accounts-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748')
}
export const getBlockedBalance = (params: Record<string, number>, id: string) => {
    return $http.get('operations-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748&type[]=2&type[]=10&is_operated=null', {
        params
    })
}
export const getOperations = (params: Record<string, number>, id: string) => {
  return $http.get('operations-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748&', {
    params,
  })
}

export const getBankingType = (params: Record<string, number>, id: string) => {
    return $http.get('operations-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748&type[]=4&type[]=5', {
        params
    })
}
export const ErrorTransaction = (params: Record<string, number>, id: string) => {
    return $http.get('operations-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748&type=5&status[]=22&status[]=33', {
        params
    })
}
export const getWithdrawal = (params: Record<string, number>, id: string) => {
    return $http.get('operations-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748&type=5', {
        params
    })
}
export const getExpenses = (params: Record<string, number>, id: string) => {
    return $http.get('operations-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748&type[]=6', {
        params
    })
}
export const postOrganizationWithdrawal = (form: any) => {
    return $http.post('operations', form) }
