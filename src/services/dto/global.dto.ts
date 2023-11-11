export interface BasicDto {
  id?: number
  createdAt?: string
  updatedAt?: string
}

export interface ItemsWithPagination<T> {
  items: T[]
  meta: {
    totalPages: number
    currentPage: number
    totalItems: number
  }
}
