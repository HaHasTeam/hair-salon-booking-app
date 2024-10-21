import { validateEmail } from '@/utils/validations/InputValidation'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRegister } from '@/api/auth'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import AsyncStorage from '@react-native-async-storage/async-storage'
const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigation = useNavigation()

  const { register, isPending, isSuccess } = useRegister({
    onRegisterSuccess,
    onRegisterFailed
  })

  function onRegisterSuccess() {
    Alert.alert('Success', 'Registered successfully')
    setEmail('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    navigation.navigate('(tabs)')
  }
  function onRegisterFailed() {
    Alert.alert('Error', 'Register failed')
  }
  const handleRegister = async () => {
    // Check if all fields are filled
    // await AsyncStorage.clear()
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required')
      return
    }

    // Email validation
    // if (!validateEmail(email)) {
    //   Alert.alert('Error', 'Please enter a valid email')
    //   return
    // }

    // Password confirmation validation
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    register({ email: email, password: password, username: username })
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sign_up_bg.jpg')}
          className='cover'
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
          }}
        />
      }
    >
      <SafeAreaView className='flex-1 justify-center items-center bg-white mt-3'>
        <View className='w-4/5'>
          <Text className='text-2xl font-bold mb-6 text-center text-green-700'>Sign up</Text>

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
    </ParallaxScrollView>
  )
}

export default RegisterScreen
