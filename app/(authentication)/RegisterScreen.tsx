import { validateEmail } from '@/validations/InputValidation'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigation = useNavigation()
  const handleRegister = async () => {
    // Check if all fields are filled
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required')
      return
    }

    // Email validation
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email')
      return
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    try {
      console.log(email, username, password)
      const response = await axios.post('http://10.0.2.2:3004/bookminton/customer/create', {
        email,
        username,
        password
      })
      if (response.status === 201) {
        Alert.alert('Success', 'Customer registered successfully')
        setEmail('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        navigation.navigate('(authentication)/LoginScreen')
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while registering')
    }
  }

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-white'>
      <View className='w-4/5'>
        <Text className='text-2xl font-bold mb-6 text-center text-green-700'>Register</Text>

        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-4 text-base focus:border focus:border-green-500'
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-4 text-base focus:border focus:border-green-500'
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
          keyboardType='default'
          autoCapitalize='none'
        />

        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-6 text-base focus:border focus:border-green-500'
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-6 text-base focus:border focus:border-green-500'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity className='bg-green-700 rounded-lg py-3 shadow-xl' onPress={handleRegister}>
          <Text className='text-center text-white font-bold text-lg'>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('(authentication)/LoginScreen')}>
          <Text className='text-center text-sm text-green-600 mt-4'>
            Already have an account? <Text className='text-green-600 underline'>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
