import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { TransactionBalance } from '~/services/dto/transcationBalance'

export const getTransactionBalance = (): Promise<
  AxiosResponse<TransactionBalance>
> => {
  return $http.get('transaction/balance')
}

export const getOperations = (params: Record<string, string>) => {
  return $http.get('transaction/operations', {
    params,
  })
}
