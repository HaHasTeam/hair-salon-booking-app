import React, { useState, useEffect } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useUpdatePassword } from '@/api/customer'

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const { mutate: updatePassword } = useUpdatePassword()

  useEffect(() => {
    if (oldPassword.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '') {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [oldPassword, password, confirmPassword])

  const handleEditProfile = async () => {
    // Basic validations
    if (!oldPassword || !password || !confirmPassword) {
      Alert.alert('Error', 'All password fields are required.')
      return
    }

    // Ensure the new password doesn't match the old one
    if (oldPassword === password) {
      Alert.alert('Error', 'The new password must be different from the old password.')
      return
    }

    // Ensure new password matches confirm password
    if (password !== confirmPassword) {
      Alert.alert('Error', 'The new password and confirm password do not match.')
      return
    }

    setIsSaving(true)

    // Call the mutation function to update the profile (password change)
    updatePassword(
      {
        oldPassword: oldPassword.trim(),
        password: password.trim()
      },
      {
        onSettled: () => {
          setIsSaving(false)
        }
      }
    )
  }

  return (
    <SafeAreaView className='flex-1 py-5 items-center bg-white'>
      <View className='w-4/5'>
        <Text className='text-xl font-bold mb-6 text-center text-green-700'>Change Password</Text>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Old Password</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Enter your old password'
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={true}
            autoCapitalize='none'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>New Password</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Enter your new password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize='none'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Confirm New Password</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Confirm your new password'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize='none'
          />
        </View>

        <TouchableOpacity
          className={`bg-green-700 rounded-lg py-3 shadow-xl mt-5 ${!isButtonEnabled || isSaving ? 'opacity-50' : ''}`}
          onPress={handleEditProfile}
          disabled={!isButtonEnabled || isSaving}
        >
          <Text className='text-center text-white font-bold text-lg'>{isSaving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ChangePassword
