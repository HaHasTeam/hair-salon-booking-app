import { IUser } from '@/types/RootStackParamList.interface'
import { log } from '@/utils/logger.util'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'
import { jwtDecode } from 'jwt-decode'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import { GET } from '@/api/apiCaller'
import { ENDPOINT } from '@/api'
import { useResgistRefetch } from '@/api/utils'
type AuthData = {
  accessToken: string | null
  refreshToken: string | null
  profile: any | IUser.IModel
  loading: boolean
  // isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
  accessToken: null,
  refreshToken: null,
  loading: true,
  profile: null
  // isAdmin: false
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<any | IUser.IModel>(null)
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const data = useResgistRefetch()

  useEffect(() => {
    const fetchSession = async () => {
      console.log('fetch session')

      try {
        const storedToken = await Promise.all([
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('refreshToken')
        ])
        console.log('accessToken line 11', accessToken)

        if (storedToken[0] && storedToken[1]) {
          setAccessToken(storedToken[0]), setRefreshToken(storedToken[1])
          const decodedToken = jwtDecode(storedToken[0])
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            const response = await GET(
              ENDPOINT.me,
              {},
              {
                authorization: 'Bearer ' + storedToken[0]
              }
            )

            if (response.status === 200) {
              setProfile(response.data.data)
            }
          }
          return
        }
      } catch (error) {
        log.error(error)
      }

      setLoading(false)
    }

    fetchSession()
  }, [data])

  return <AuthContext.Provider value={{ accessToken, refreshToken, loading, profile }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
