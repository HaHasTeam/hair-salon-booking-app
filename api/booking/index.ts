import { useAuth } from '@/provider/AuthProvider'
import { IBooking } from '@/types/Booking'
import { ISchedule } from '@/types/ISchedule'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GET, POST } from '../apiCaller'
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

export const useMyBookingList = () => {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['receipt'],
    queryFn: async () => {
      const response = await GET(
        ENDPOINT.getMyBooking,
        {},
        {
          authorization: 'Bearer ' + accessToken
        }
      )

      if (response.status !== 200) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`)
      }

      return response.data.data
    }
  })
}

export const useBookingDetail = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      console.log('id: ', id)

      const response = await GET(
        ENDPOINT.getBookingDetail(id),
        {},
        {
          authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE2MDk0YWIzYzc4ZjkxYzA3MTcyMjciLCJpYXQiOjE3Mjk2MTY4MzksImV4cCI6MTcyOTcwMzIzOX0.MkTiEOSuTEm1W_SRSseZQtNzVnenU_jDrHuwcA3YllM'
        }
      )

      if (response.status !== 200) {
        throw new Error(`Failed to fetch Branch Detail: ${response.statusText}`)
      }

      return response.data.data[0]
    }
  })
}
