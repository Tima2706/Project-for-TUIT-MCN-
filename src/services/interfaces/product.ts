export interface ProductImageItem {
  path: string
  id: number
}

export interface ProductMeasureItem {
  id: number
  name: string
}

export interface ProductItem {
  name: string
  price: number
  id: number
  images: ProductImageItem[]
  measure: ProductMeasureItem
}
