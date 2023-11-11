export interface ProfileEdit {
  name: string
  type?: string
  logo?: File
  address?: string
  tin?: string
  oked?: string
  website?: string
  email?: string
  employees_count: number | string
  phone?: string
}

export interface ProfileInfo {
  id: string | number
  name: string
  type?: string
  logo?: string
  address?: string
  tin?: string
  oked?: string
  website?: string
  email?: string
  employees_count?: number
  phone?: string
}
