import type { User } from '~/types'

export interface LoginRequest {
  username: string
  password: string
}
export interface RegisterRequest {
  username: string
  password: string
  firstname: string
  lastname: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number // in seconds
}

export interface ConfirmOTPRequest {
  phone: string
  token: string
  code: string
}

export interface ConfirmOTPResponse {
  authorization: {
    token: string
  }
}

export type MeResponse = Pick<User, 'id' | 'name'>

export interface AuthLoginWithKeyRequest {
  pkcs7_64: string
}

export interface AuthLoginWithKeyResponse {
  access_token: string
  need_to_register: boolean
  organization_tin: string
}
