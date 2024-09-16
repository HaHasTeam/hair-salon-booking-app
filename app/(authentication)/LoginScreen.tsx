import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleLogin = async () => {
    // Check if both fields are filled
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required')
      return
    }
    try {
      const response = await axios.post('http://10.0.2.2:3004/bookminton/auth/login', {
        email,
        password
      })

      if (response.status === 200) {
        Alert.alert('Success', 'Logged in successfully')
        console.log(response?.data?.data)
        setEmail('')
        setPassword('')
        // navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', response?.data?.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while logging in')
    }
  }
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-white'>
      <View className='w-4/5'>
        <Text className='text-2xl font-bold mb-6 text-center text-green-700'>Login</Text>

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
        <TouchableOpacity onPress={() => navigation.navigate('(authentication)/RegisterScreen')}>
          <Text className='text-center text-sm text-green-600 mt-4'>
            Don't have an account? <Text className='text-green-600 underline'>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
