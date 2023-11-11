import type { BasicDto } from '~/services/dto/global.dto'

export interface CategoryData extends BasicDto {
  name: string
  slug: string
  icon?: string
  isMain: boolean
  isTop: boolean
}

export interface CategoryForm {
  id?: number
  name: string
  parentId?: number
  isMain: boolean
  isTop: boolean
  icon?: Array<string>
}
