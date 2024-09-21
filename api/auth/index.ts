import axios, { AxiosResponse } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IAuth } from '@/types/RootStackParamList.interface'
import { POST } from '../apiCaller'
import { ENDPOINT } from '..'
import { log } from '@/utils/logger.util'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useLogin = (): IAuth.ILoginResult => {
  const {
    mutate: login,
    isSuccess,
    isPending
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: IAuth.ILoginParameters) => {
      return await POST(ENDPOINT.login, data, {})
    },
    onSuccess: async (res: AxiosResponse) => {
      if (res) {
        console.log(res)
        await AsyncStorage.setItem('accessToken', res.data.data.accessToken)
        await AsyncStorage.setItem('refreshToken', res.data.data.refreshToken)
        return res.data.data
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
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

export const useRegister = (): IAuth.IRegisterResult => {
  const {
    mutate: register,
    isSuccess,
    isPending
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: IAuth.IRegisterParameters) => {
      return await POST(ENDPOINT.register, data, {})
    },
    onSuccess: async (res: AxiosResponse) => {
      log.debug(res)
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        log.error('error: ', error)

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
