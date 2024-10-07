import axios, { AxiosResponse } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IAuth } from '@/types/RootStackParamList.interface'
import { POST } from '../apiCaller'
import { ENDPOINT } from '..'
import { log } from '@/utils/logger.util'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useLogin = ({
  onLoginSuccess,
  onLoginFailed
}: {
  onLoginSuccess: (res: AxiosResponse) => void
  onLoginFailed: () => void
}): IAuth.ILoginResult => {
  const {
    mutateAsync: login,
    isSuccess,
    isPending
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: IAuth.ILoginParameters) => {
      console.log(data)

      return await POST(ENDPOINT.login, data, {})
    },
    onSuccess: async (res: AxiosResponse) => {
      if (res.data.data.accessToken) {
        console.log('accessToken', res.data.data.accessToken)
        console.log('refreshToken', res.data.data.refreshToken)

        await AsyncStorage.setItem('accessToken', res.data.data.accessToken)
        await AsyncStorage.setItem('refreshToken', res.data.data.refreshToken)
        await onLoginSuccess(res)
        return res.data.data
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        onLoginFailed()
        log.error('error: ', error)
      }
    }
  })

  return {
    login,
    isSuccess,
    isPending
  }
}

export const useRegister = ({
  onRegisterSuccess,
  onRegisterFailed
}: {
  onRegisterSuccess: () => void
  onRegisterFailed: () => void
}): IAuth.IRegisterResult => {
  const {
    mutateAsync: register,
    isSuccess,
    isPending
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: IAuth.IRegisterParameters) => {
      console.log('register', data)

      return await POST(ENDPOINT.register, data, {})
    },
    onSuccess: async (res: AxiosResponse) => {
      console.log(res.data.data)

      onRegisterSuccess()
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        log.error('error: ', error)
        onRegisterFailed()
        return error
      }
    }
  })

  return {
    register,
    isSuccess,
    isPending
  }
}
