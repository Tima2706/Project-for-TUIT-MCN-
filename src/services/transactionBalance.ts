import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { TransactionBalance } from '~/services/dto/transcationBalance'

export const getTransactionBalance = (params: Record<any, any>): Promise<
  AxiosResponse<TransactionBalance>
> => {
  return $http.get('organization-balances?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748')
}

export const getOperations = (params: Record<string, number>, id: string) => {
  return $http.get('operations-search?organization_id=7d28b7db-c6e1-442e-af46-c6635eca7748&', {
    params,
  })
}
export const getOrganizationPartner = (form: any) => {
    return $http.get('organizations', form)
}
