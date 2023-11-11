export interface BankDetailsForm {
  id?: number | string
  bank_name: string
  account_number: string
  mfo: string
  is_active: boolean
}

export interface BankDetailsInfo {
  id: string | number
  bank_name: string
  account_number: string
  mfo: string
  is_active: boolean
}
