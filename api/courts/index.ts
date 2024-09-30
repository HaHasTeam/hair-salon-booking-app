import { useAuth } from '@/provider/AuthProvider'
import { ENDPOINT } from '..'
import { GET, POST } from '../apiCaller'
import { useMutation } from '@tanstack/react-query'

export const useGetCourtAvailable = () => {
  const { accessToken } = useAuth()
  return useMutation({
    mutationFn: async (data: { slots: (string | undefined)[]; date: string | undefined; branch: string }) => {
      const response = await POST(ENDPOINT.getCourtAvailable, data, {}, { authorization: 'Bearer ' + accessToken })

      if (response.status !== 200) {
        throw new Error(`Failed to fetch getCourtAvalableMutatue: ${response.statusText}`)
      }

      return response.data.data
    }
  })
}
