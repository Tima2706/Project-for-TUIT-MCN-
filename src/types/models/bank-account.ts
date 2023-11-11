import type { BankItem } from '~/types'

export interface BankAccountItem {
  bank: BankItem
  id?: number
  number: string
}
