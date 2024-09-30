export interface ISlot {
  _id?: string
  name?: string
  weekDay: string
  startTime: string
  endTime: string
  surcharge: number
  branch?: string
}

export interface ITimeSlot {
  _id?: string
  name?: string
  weekDay: string
  startTime: string
  endTime: string
  surcharge: number
  branch?: string
  isInThePass: boolean
  timeDisplay: string
}
