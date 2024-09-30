import { ICourt } from './Court'
import { IUser } from './RootStackParamList.interface'

export interface IBooking {
  _id?: string
  type: string
  paymentType: string
  paymentMethod: string
  totalPrice: number
  totalHour: number
  startDate: string
  endDate: string
  status: string
  court: ICourt
  customer?: string | IUser.IModel
}
