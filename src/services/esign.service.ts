import { $http } from './baseHttp'
import type { ESignChallengeDTO } from './dto'

export const getChallenge = () => {
  return $http.get<ESignChallengeDTO>('esign/challenge')
}

export const sign = (pkcs7_64: string) => {
  return $http.post<ESignChallengeDTO>('esign/sign', { pkcs7_64 })
}
