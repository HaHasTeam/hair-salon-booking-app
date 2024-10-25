import { useAuth } from '@/provider/AuthProvider'
import { IBooking } from '@/types/Booking'
import { ISchedule } from '@/types/ISchedule'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GET, POST, PUT } from '../apiCaller'
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
  const { accessToken } = useAuth()
  console.log('accessToken', accessToken)

  return useQuery({
    queryKey: ['booking', id],
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

export const useBookingDetailById = () => {
  const { accessToken } = useAuth()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await GET(
        ENDPOINT.getBookingDetailById(id),
        {},
        {
          authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE2MDk0YWIzYzc4ZjkxYzA3MTcyMjciLCJpYXQiOjE3Mjk4NzgwMzMsImV4cCI6MTcyOTk2NDQzM30.ae5SeMgFKYnI6NIwlHZr1cUXY-OyEbvTBM6kmkQEsSA'
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
          authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE2MDk0YWIzYzc4ZjkxYzA3MTcyMjciLCJpYXQiOjE3Mjk4ODUxNTV9.4PJk2pNrAjXOyAyiOVY-z82jskMwrJ10BjbpjE9UYu0'
        }
      )

      if (response.status !== 200) {
        console.log(response);
        throw new Error(`Failed: ${response}`)
      }

      return response.data.data
    }
  })
}