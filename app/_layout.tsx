import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useNavigation } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { NativeBaseProvider, Text, Box, Pressable } from 'native-base'
import { useColorScheme } from '@/hooks/useColorScheme'
import QueryProvider from '@/provider/QueryProvider'
import AuthProvider from '@/provider/AuthProvider'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <NativeBaseProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryProvider>
          <AuthProvider>
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='(authentication)/RegisterScreen' options={{ headerShown: true, title: 'Sign up' }} />
              <Stack.Screen name='(authentication)/LoginScreen' options={{ headerShown: true, title: 'Sign in' }} />
              <Stack.Screen name='(profile)/EditProfile' options={{ headerShown: true, title: 'Edit profile' }} />
              <Stack.Screen name='(profile)/ChangePassword' options={{ headerShown: true, title: 'Change password' }} />
              <Stack.Screen name='+not-found' />
            </Stack>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </NativeBaseProvider>
  )
}
