import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GET, POST, PUT } from '@/api/apiCaller'
import { ENDPOINT } from '@/api'
import { useAuth } from '@/provider/AuthProvider'
import IProfile from '@/types/Profile'
import { Alert } from 'react-native'

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

export const useUpdateProfile = () => {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<IProfile, Error, IProfile>({
    mutationFn: async (data: IProfile) => {
      if (!accessToken) {
        throw new Error('No access token available. Please log in again.')
      }
      console.log(3)

      try {
        const response = await PUT(
          ENDPOINT.profile,
          {
            username: data.username,
            gender: data.gender,
            dob: data.dob,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
          },
          {},
          { authorization: 'Bearer ' + accessToken }
        )

        console.log('response: ', JSON.stringify(response))
        if (response.status !== 200) {
          throw new Error(`Failed to update profile: ${response.statusText}`)
        }

        return response.data.data
      } catch (error) {
        console.error('Error in PUT request:', error)
        throw error
      }
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['profile', { _id: variables._id }], data)
      Alert.alert('Success', 'Profile updated successfully!')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error[0].message ?? 'Failed to update profile.'
      Alert.alert('Error', errorMessage)
    }
  })
}
export const useUpdatePassword = () => {
  const { accessToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<IProfile, Error, IProfile>({
    mutationFn: async (data: IProfile) => {
      if (!accessToken) {
        throw new Error('No access token available. Please log in again.')
      }

      const response = await POST(
        ENDPOINT.changePassword,
        {
          oldPassword: data.oldPassword,
          newPassword: data.password
        },
        {},
        { authorization: 'Bearer ' + accessToken }
      )

      if (response.status !== 201) {
        throw new Error(`Failed to update password: ${response.statusText}`)
      }

      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
      Alert.alert('Success', 'Password updated successfully!')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message ?? 'Failed to update password.'
      Alert.alert('Error', errorMessage)
    }
  })
}
