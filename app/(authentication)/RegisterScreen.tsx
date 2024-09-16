import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const RegisterScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-white'>
      <View className='w-4/5'>
        <Text className='text-2xl font-bold mb-6 text-center text-green-700'>Register</Text>

        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-4 text-base focus:border focus:border-green-500'
          placeholder='Email'
          //   value={email}
          //   onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-4 text-base focus:border focus:border-green-500'
          placeholder='Username'
          //   value={username}
          //   onChangeText={setUsername}
          keyboardType='default'
          autoCapitalize='none'
        />

        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-6 text-base focus:border focus:border-green-500'
          placeholder='Password'
          //   value={password}
          //   onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          className='bg-emerald-50 rounded-lg p-4 mb-6 text-base focus:border focus:border-green-500'
          placeholder='Confirm Password'
          //   value={confirmPassword}
          //   onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity
          className='bg-green-700 rounded-lg py-3 shadow-xl'
          //   onPress={handleRegister}
        >
          <Text className='text-center text-white font-bold text-lg'>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('(authentication)/LoginScreen')}>
          <Text className='text-center text-sm text-green-600 mt-4'>
            Already have an account? <Text className='text-green-600 underline'>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen