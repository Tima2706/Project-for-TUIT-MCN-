export interface Bank {
  id: string
  organization_id: string
  doc_number: string
  type: number
  summa: string
  note: string
  date: string
  is_operated: number
  status: number
  organization_account: {
    organization_id: string
    bank_id: number
    account: string
    bank: {
      bank_id: string
      name: string
      mfo: string
    }
  }
}
