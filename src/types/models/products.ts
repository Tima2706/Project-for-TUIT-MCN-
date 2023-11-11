export interface Product {
  id: number
  image?: string
  name_uz: string
  name_ru: string
  price?: string
  status: string
  slug: string
}

export interface ProductForm {
  vendor_code?: string
  color_id?: number
  category_id: number | string
  brand_id?: number
  tnved_code_id?: number
  measure_id?: number
  group_id?: number
  name_uz: string
  name_ru: string
  slug: string
  price_type: number | string
  price: number | string
  discount?: number | string
  stock?: number
  min_order?: number
  max_order?: number
  product_condition: number | string
  delivery_time: number | string
  timing_type: number[]
  delivery_type?: number[]
  functional_characteristics_uz?: string
  functional_characteristics_ru?: string
  technical_characteristics_uz?: string
  technical_characteristics_ru?: string
  storage_requirements_uz?: string
  storage_requirements_ru?: string
  expiration_date?: number
  expiration_timing_type: string
  opinions_availability_uz?: string
  opinions_availability_ru?: string
  warranty_date?: string
  warranty_timing_type: number | string
  required_documents_for_transfer_uz?: string
  required_documents_for_transfer_ru?: string
  images?: File[]
  sale_types: number[] | string[]
}
