import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GET } from '@/api/apiCaller'
import { ENDPOINT } from '@/api'
import { useAuth } from '@/provider/AuthProvider'

export const useUserProfile = () => {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error('No access token available. Please log in again.')
      }

      const response = await GET(ENDPOINT.profile, {}, { authorization: 'Bearer ' + accessToken })
      console.log('response: ', response)
      if (response.status !== 200) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`)
      }

      return response.data.data
    }
  })
}
