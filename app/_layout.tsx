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
import CreateFeedback from '@/components/CreateFeedback'

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
              <Stack.Screen name='index' key={1} options={{ headerShown: false }} />
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='checkout' options={{ headerShown: false }} />
              {/* <Stack.Screen name='LoginRegisterScreen' options={{ headerShown: false }} /> */}
              <Stack.Screen name='ressult' options={{ headerShown: false }} />
              <Stack.Screen name='(authentication)/RegisterScreen' options={{ headerShown: true, title: 'Sign up' }} />
              <Stack.Screen name='(authentication)/LoginScreen' options={{ headerShown: true, title: 'Sign in' }} />
              <Stack.Screen name='(profile)/EditProfile' options={{ headerShown: true, title: 'Edit profile' }} />
              <Stack.Screen name='faq' options={{ headerShown: false, title: 'Help Desk' }} />
              <Stack.Screen name='contact' options={{ headerShown: false, title: 'Contact' }} />
              <Stack.Screen
                name='(modal)/feedbackModal'
                options={{
                  headerShown: true,
                  title: 'Đánh giá',
                  presentation: 'containedModal',
                  headerRight: CreateFeedback
                }}
              />
              <Stack.Screen
                name='(modal)/feedbackCreate'
                options={{
                  headerShown: true,
                  title: 'Đánh giá chất lượng dịch vụ',
                  presentation: 'containedModal'
                }}
              />
              <Stack.Screen name='checking/index' options={{ headerShown: true, title: 'checking' }} />
              <Stack.Screen name='+not-found' />
            </Stack>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </NativeBaseProvider>
  )
}
