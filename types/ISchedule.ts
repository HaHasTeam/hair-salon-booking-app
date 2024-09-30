import { IBooking } from './Booking'
import { ICourt } from './Court'

export interface ISchedule {
  _id?: string
  type: string
  slots: string[]
  startTime: string
  endTime: string
  date: string
  booking?: string | IBooking
  court: string | ICourt
  status: string
}
