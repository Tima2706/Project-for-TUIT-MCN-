import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { TransactionBalance } from '~/services/dto/transcationBalance'

export const getTransactionBalance = (params: Record<any, any>): Promise<
  AxiosResponse<TransactionBalance>
> => {
  return $http.get('organization-balances', {params})
}

export const getOperations = (params: Record<string, string>) => {
  return $http.get('operations-search', {
    params,
  })
}
export const getOrganizationPartner = (form: any) => {
    return $http.get('organizations', form)
}
