import type { BranchStatusEnum } from '.'

import type { ICourt } from './Court'
import type { IManager } from './Manager'
import type { ISlot } from './Slot'

export interface IBranch {
  _id?: string
  name: string
  phone: string
  address: string
  images?: string[]
  license: string[]
  description: string
  availableTime: string
  status?: BranchStatusEnum
  manager?: string | IManager
  courts: ICourt[]
  slots: ISlot[]
}
