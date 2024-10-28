import { IBooking } from '@/types/Booking'
import { IBranch } from '@/types/Branch'
import { ICourt } from '@/types/Court'
import { ISchedule } from '@/types/ISchedule'
import { create } from 'zustand'

export type BookingData = {
  booking: Omit<IBooking, 'status'> | null
  schedule: Omit<ISchedule, 'status'> | null
  paymentType: string
  selectedBrach: IBranch | null

  service: ICourt[] | null
}
export type BookingDataState = {
  bookingData: BookingData
}
export type BookingDataActions = {
  setBookingData: (data: BookingData) => void
  resetBookingData: () => void
  setPaymentType: (paymentType: string) => void
  setSelectedService: (service: ICourt[]) => void
  setSelectedBranch: (branch: IBranch) => void
}

export type BookingDataStore = BookingDataState & BookingDataActions
export const defaultInitState: BookingDataState = {
  bookingData: {
    booking: null,
    schedule: null,
    selectedBrach: null,
    paymentType: 'full',
    service: []
  }
}

export const useCheckoutStore = create<BookingDataStore>()((set) => ({
  ...defaultInitState,
  setBookingData: (data) =>
    set((state) => {
      state.bookingData.booking = data.booking
      state.bookingData.schedule = data.schedule
      state.bookingData.selectedBrach = data.selectedBrach
      state.bookingData.service = data.service
      console.log('"setBookingData" called')

      return { ...state }
    }),
  resetBookingData: () => {
    console.log('"resetBookingData" called')

    return set((state) => {
      return { ...state, bookingData: { ...defaultInitState.bookingData } }
    })
  },
  setPaymentType: (data) =>
    set((state) => {
      return { ...state, paymentType: data }
    }),
  setSelectedService: (data) =>
    set((state) => {
      state.bookingData.service = data
      console.log('"setSelectedService" called')

      return { ...state }
    }),
  setSelectedBranch: (data) =>
    set((state) => {
      state.bookingData.selectedBrach = data
      console.log('"setSelectedBranch" called')

      return { ...state }
    })
}))
