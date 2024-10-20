import { IUser } from '@/types/RootStackParamList.interface'
import { log } from '@/utils/logger.util'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from 'expo-router'
import { jwtDecode } from 'jwt-decode'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GET } from '@/api/apiCaller'
import { ENDPOINT } from '@/api'
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

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const storedToken = await Promise.all([
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('refreshToken')
        ])
        log.debug('Stored token', storedToken)
        if (storedToken[0] && storedToken[1]) {
          setAccessToken(storedToken[0]), setRefreshToken(storedToken[1])
          const decodedToken = jwtDecode(storedToken[0])
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            const response = await GET(
              ENDPOINT.me,
              {},
              {
                authorization:
                  'Bearer ' +
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0YWY2YTk4NTFlNDQ5OWIyZWRlODkiLCJpYXQiOjE3Mjk0MDkwMTEsImV4cCI6MTcyOTQ5NTQxMX0.LPhjN6nUAKziVhOmtC7tOuotS89XM4fXPGLdAVZmk8E'
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
  }, [])

  return <AuthContext.Provider value={{ accessToken, refreshToken, loading, profile }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
