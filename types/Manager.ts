export interface IManager {
  _id?: string
  username: string
  email: string
  password: string
  gender: string
  firstName: string
  lastName: string
  phone: string
  dob: Date
  expiredDate?: Date
  maxCourt?: number
  role: string
  status: string
}
