import { validateEmail } from '@/utils/validations/InputValidation'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useUpdateProfile, useUserProfile } from '@/api/customer'
import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useQueryClient } from '@tanstack/react-query'

const EditProfile = () => {
  const [_id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState(new Date())
  const [show, setShow] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const { data: profile, error, isLoading } = useUserProfile()
  const { mutate: updateProfile } = useUpdateProfile()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (profile) {
      setEmail(profile.email)
      setId(profile._id)
      setPhone(profile.phone)
      setUsername(profile.username)
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
      setGender(profile.gender)
      setDob(new Date(profile.dob))
    }
  }, [profile])

  useEffect(() => {
    if (profile) {
      const isDataChanged =
        profile.username !== username ||
        profile.phone !== phone ||
        profile.firstName !== firstName ||
        profile.lastName !== lastName ||
        profile.gender !== gender ||
        profile.dob !== dob.toISOString()

      setHasChanges(isDataChanged)
    }
  }, [username, phone, firstName, lastName, gender, dob, profile])

  if (isLoading) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }

  if (error) {
    console.log(error)
    return <Text className='mt-28'>{error.message}</Text>
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dob
    setShow(false)
    setDob(currentDate)
  }

  const showDatePicker = () => {
    setShow(true)
  }

  const data = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ]

  const handleEditProfile = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email')
      return
    }

    setIsSaving(true)

    try {
      await updateProfile({
        _id: _id,
        phone: phone,
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: dob.toISOString()
      })

      queryClient.invalidateQueries(['profile'])
      setIsSaving(false)
      setHasChanges(false)
    } catch (error) {
      setIsSaving(false)
      console.error('Error while updating profile:', error)
    }
  }

  return (
    <SafeAreaView className='flex-1 py-5 items-center bg-white'>
      <View className='w-4/5'>
        <Text className='text-xl font-bold mb-6 text-center text-green-700'>Change password</Text>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Username</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
            keyboardType='default'
            autoCapitalize='none'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Email</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Phone Number</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Phone Number'
            value={phone}
            onChangeText={setPhone}
            keyboardType='number-pad'
            autoCapitalize='none'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>First Name</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='First Name'
            value={firstName}
            onChangeText={setFirstName}
            keyboardType='default'
            autoCapitalize='none'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Last Name</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Last Name'
            value={lastName}
            onChangeText={setLastName}
            keyboardType='default'
            autoCapitalize='none'
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Gender</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder='Select gender'
            value={gender}
            onChange={(item) => setGender(item.value)}
          />
        </View>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Date Of Birth</Text>
          {show && <DateTimePicker testID='dateTimePicker' value={dob} mode={'date'} onChange={handleDateChange} />}
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Date Of Birth'
            value={dob.toISOString().split('T')[0]}
            keyboardType='default'
            autoCapitalize='none'
            onPressIn={showDatePicker}
          />
        </View>

        <TouchableOpacity
          className={`bg-green-700 rounded-lg py-3 shadow-xl mt-5 ${!hasChanges || isSaving ? 'opacity-50' : ''}`}
          onPress={handleEditProfile}
          disabled={!hasChanges || isSaving}
        >
          <Text className='text-center text-white font-bold text-lg'>{isSaving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '600'
  }
})
