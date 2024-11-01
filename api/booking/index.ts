import { useAuth } from '@/provider/AuthProvider'
import { IBooking } from '@/types/Booking'
import { ISchedule } from '@/types/ISchedule'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GET, POST, PUT } from '../apiCaller'
import { ENDPOINT } from '..'

export const usePostBooking = ({ onSuccessCB }: { onSuccessCB: (data) => void }) => {
  const { accessToken } = useAuth()
  return useMutation({
    mutationKey: ['postBooking', accessToken],
    mutationFn: async (bookingReq: {
      booking: Omit<IBooking, 'status'>
      schedule: Omit<ISchedule, 'status'>
      transaction: { amount: number; payment: string }
    }) => {
      console.log('usePostBooking', bookingReq)
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
    queryKey: ['receipt', accessToken],
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
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['booking', id, accessToken],
    queryFn: async () => {
      console.log('id: ', id)

      const response = await GET(
        ENDPOINT.getBookingDetail(id),
        {},
        {
          authorization: 'Bearer ' + accessToken
        }
      )

      if (response.status !== 200) {
        throw new Error(`Failed to fetch Branch Detail: ${response.statusText}`)
      }

      return response.data.data[0]
    }
  })
}

export const useBookingDetailById = (id:string) => {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['bookingDetailById',id],
    queryFn: async () => {
      const response = await GET(
        ENDPOINT.getBookingDetailById(id),
        {},
        {
          authorization: 'Bearer ' + accessToken
        }
      )
      if (response.status !== 200) {
        throw new Error(`Failed to get data: ${response}`)
      }

      return response.data.data
    }
  })
}

export const useDoneBooking = () => {
  const { accessToken } = useAuth()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await PUT(
        ENDPOINT.doneBooking(id),
        {},
        {},
        {
          authorization: 'Bearer ' + accessToken
        }
      )

      if (response.status !== 200) {
        console.log(response)
        throw new Error(`Failed: ${response}`)
      }

      return response.data.data
    }
  })
}
