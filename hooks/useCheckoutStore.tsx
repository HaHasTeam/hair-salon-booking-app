import { IBooking } from '@/types/Booking'
import { ISchedule } from '@/types/ISchedule'
import { create } from 'zustand'

export type BookingData = {
  booking: Omit<IBooking, 'status'> | null
  schedule: Omit<ISchedule, 'status'> | null
  paymentType: string
}
export type BookingDataState = {
  bookingData: BookingData
}
export type BookingDataActions = {
  setBookingData: (data: BookingData) => void
  resetBookingData: () => void
  setPaymentType: (paymentType: string) => void
}

export type BookingDataStore = BookingDataState & BookingDataActions
export const defaultInitState: BookingDataState = {
  bookingData: {
    booking: null,
    schedule: null,
    paymentType: 'full'
  }
}

export const useCheckoutStore = create<BookingDataStore>()((set) => ({
  ...defaultInitState,
  setBookingData: (data) =>
    set((state) => {
      state.bookingData.booking = data.booking
      state.bookingData.schedule = data.schedule

      return { ...state }
    }),
  resetBookingData: () => set(defaultInitState),
  setPaymentType: (data) =>
    set((state) => {
      return { ...state, paymentType: data }
    })
}))