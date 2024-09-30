import { useQuery } from '@tanstack/react-query'
import { POST } from '../apiCaller'
import { ENDPOINT } from '..'
import { BookingData } from '@/hooks/useCheckoutStore'
import { useAuth } from '@/provider/AuthProvider'

export const useGetPayOsInfo = ({ totalAmount, courtId }: { totalAmount?: number; courtId: string }) => {
  const { accessToken } = useAuth()
  return useQuery({
    queryKey: ['bookingPayOSLink', totalAmount],
    queryFn: async () => {
      if (totalAmount && courtId) {
        const response = await POST(
          ENDPOINT.getPaymentInfo,
          {
            amount: totalAmount,
            description: 'Booking PickleBall Court',
            courtId: courtId
          },
          {},
          { authorization: 'Bearer ' + accessToken }
        )

        if (response.status !== 200) {
          throw new Error(`Failed to fetch bookingPayOSLink: ${response.statusText}`)
        }
        console.log(response.data)
        return response.data
      }

      return null
    },
    enabled: !!totalAmount
  })
}
