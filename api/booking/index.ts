import { useAuth } from '@/provider/AuthProvider'
import { IBooking } from '@/types/Booking'
import { ISchedule } from '@/types/ISchedule'
import { useMutation } from '@tanstack/react-query'
import { POST } from '../apiCaller'
import { ENDPOINT } from '..'

export const usePostBooking = ({ onSuccessCB }: { onSuccessCB: (data) => void }) => {
  const { accessToken } = useAuth()
  return useMutation({
    mutationKey: ['postBooking'],
    mutationFn: async (bookingReq: {
      booking: Omit<IBooking, 'status'>
      schedule: Omit<ISchedule, 'status'>
      transaction: { amount: number; payment: string }
    }) => {
      const response = await POST(ENDPOINT.postBooking, bookingReq, {}, { authorization: 'Bearer ' + accessToken })

      if (response.status !== 200) {
        throw new Error(`Failed to fetch bookingPayOSLink: ${response.statusText}`)
      }
      return response.data.data
    },
    onSuccess(data) {
      onSuccessCB(data)
    }
  })
}
