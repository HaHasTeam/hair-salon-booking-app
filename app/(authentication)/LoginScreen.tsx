import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useLogin } from '@/api/auth'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosResponse } from 'axios'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const { login } = useLogin({ onLoginSuccess, onLoginFailed })
  async function onLoginSuccess(res: AxiosResponse) {
    console.log(res.data.data)
    await AsyncStorage.setItem('accessToken', res.data.data.accessToken)
    await AsyncStorage.setItem('refreshToken', res.data.data.refreshToken)
    Alert.alert('Success', 'Logged in successfully')
    setEmail('')
    setPassword('')
    navigation.navigate('(tabs)')
  }
  function onLoginFailed() {
    Alert.alert('Error', 'Login failed')
  }
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required')
      return
    }
    login({ email, password })
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    navigation.navigate('LoginRegisterScreen', {})
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sign_in_bg.jpg')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
          }}
        />
      }
    >
      <SafeAreaView className='flex-1 mt-7'>
        <View className='flex-grow justify-center items-center px-5'>
          <View className='w-full max-w-md'>
            <Text className='text-2xl font-bold mb-6 text-center text-green-700'>Sign in</Text>

            <TextInput
              className=' rounded-lg p-4 mb-4 text-base bg-emerald-50 focus:border focus:border-green-500'
              placeholder='Email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />

            <TextInput
              className=' rounded-lg p-4 mb-6 text-base bg-emerald-50 focus:border focus:border-green-500'
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity className='bg-green-700 rounded-lg py-3 shadow-xl' onPress={handleLogin}>
              <Text className='text-center text-white font-bold text-lg'>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
              <Text className='text-center text-sm text-green-600 mt-4'>
                Don't have an account? <Text className='text-green-600 underline'>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ParallaxScrollView>
  )
}

export default LoginScreen
