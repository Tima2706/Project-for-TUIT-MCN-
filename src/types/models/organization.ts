export interface Organization {
  id: number
  name: string
  business_category: string
  director: {
    firstname: string
    lastname: string
    middlename: string
  }
  logo?: string
  address?: string
  tin?: string
  oked?: string
  website: string
  email: string
  phone_number: string
  account_number: string
  mfo: string
  director_tin: string
}
