export interface PaginationData<T = any> {
  items: T[]
  meta: {
    totalPages: number
    totalItems: number
  }
}
