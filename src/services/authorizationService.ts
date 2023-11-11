import type { AxiosResponse } from 'axios'
import { $http } from '~/services/baseHttp'
import type { AuthLoginWithKeyRequest, AuthLoginWithKeyResponse, ConfirmOTPRequest, ConfirmOTPResponse, LoginRequest, LoginResponse, MeResponse } from '~/services/dto/auth.dto'

export const login = (data: LoginRequest) => {
  return $http.post<LoginRequest, AxiosResponse<LoginResponse>>('auth/login', data)
}

export const confirmOtp = (req: ConfirmOTPRequest) => {
  return $http.post<ConfirmOTPRequest, AxiosResponse<ConfirmOTPResponse>>('auth/login/otp', req)
}

export const me = () => {
  return $http.post<null, AxiosResponse<MeResponse>>('auth/me')
}

export const loginWithSign = (body: AuthLoginWithKeyRequest) => {
  return $http.post<AuthLoginWithKeyRequest, AxiosResponse<AuthLoginWithKeyResponse>>('auth/login-with-sign', body)
}
