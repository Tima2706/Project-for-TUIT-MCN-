export type ProductAttributesType = 'Radio' | 'Checkbox' | 'Color' | 'Select'

export interface ProductDto {
  id: number
  name: string
  description_ru: string
  description_en: string
  description_uz: string
  price: number
  slug: string
  measure: { id: number; name: string }
  category?: { id: number }
  quantity: number
  images: Array<{
    path: string
    id: number
  }>
  attributes: Array<{
    id: number
    name_ru: string
    name_uz: string
    product_attribute_id: number
    value: string
  }>
  status: string
}

export interface ProductFormDto {
  name: string
  images?: string[]
  category_id?: number
  price?: number
  quantity?: number
  measure_id?: number
  status: string
  description_uz: string
  description_ru: string
  description_en: string
}

export interface ProductAttributes {
  id?: number
  name_ru?: string
  name_uz?: string
  type?: ProductAttributesType
  items?: Array<{
    id: number
    name_ru: string
    name_uz: string
    value: string
    product_attribute_id: number
  }>
}
