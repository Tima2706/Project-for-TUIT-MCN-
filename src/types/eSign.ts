export interface ESignKey {
  CN: string
  TIN: string
  PINFL: string
  serialNumber: string
  VALID_FROM: Date
  VALID_TO: Date
}

export interface ESignAlias {
  '1.2.860.3.16.1.1': string // org tin
  cn: string // Director name
  o: string // Organization name
  st: string // Address
  uid: string // director tin
}
