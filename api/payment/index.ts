import { useMutation, useQuery } from '@tanstack/react-query'
import { POST } from '../apiCaller'
import { ENDPOINT } from '..'
import { BookingData } from '@/hooks/useCheckoutStore'
import { useAuth } from '@/provider/AuthProvider'

export const useGetPayOsInfo = ({
  totalAmount,
  courtId,
  returnUrl,
  user,
  onSuccessCB
}: {
  user?: string
  totalAmount?: number
  courtId: string
  returnUrl: string
  onSuccessCB: (data) => void
}) => {
  const { accessToken } = useAuth()
  return useMutation({
    mutationKey: ['bookingPayOSLink', totalAmount],
    mutationFn: async () => {
      if (totalAmount && courtId) {
        const response = await POST(
          ENDPOINT.getPaymentInfo,
          {
            amount: totalAmount,
            description: `Đặt lịch cắt tóc cho ${user} `,
            courtId: courtId,
            returnUrl: returnUrl,
            cancelUrl: returnUrl
          },
          {},
          { authorization: 'Bearer ' + accessToken }
        )

        if (response.status !== 200) {
          throw new Error(`Failed to fetch bookingPayOSLink: ${response.statusText}`)
        }
        return response.data.data
      }

      return null
    },
    onSuccess(data) {
      onSuccessCB(data)
    }
  })
}
