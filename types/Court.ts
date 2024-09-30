import type { CourtStatusEnum } from '.'

import type { IManager } from './Manager'
export interface ICourt {
  _id?: string
  name: string
  type: string
  price: number
  images?: File[] | string[]
  description: string
  status: CourtStatusEnum
  branch?: string | IManager
}
