export interface DataPagination {
  current_page: number
  per_page: number
  total: number
  last_page: number
}
export interface DataWithPagination<U> {
  data: U
  pagination: DataPagination
}
