import { validateEmail } from '@/utils/validations/InputValidation'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRegister } from '@/api/auth'
import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import DateTimePicker from '@react-native-community/datetimepicker'

const EditProfile = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState(new Date(1598051730000))
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDob(currentDate)
  }

  const showDatePicker = () => {
    setShow(true)
  }

  const navigation = useNavigation()

  const data = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ]

  const { register, isSuccess } = useRegister()

  const handleEditProfile = async () => {
    // Email validation
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email')
      return
    }
  }

  return (
    <SafeAreaView className='flex-1 py-5 items-center bg-white'>
      <View className='w-4/5'>
        <Text className='text-xl font-bold mb-6 text-center text-green-700'>Edit Profile</Text>

        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Email</Text>
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>
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
            onChange={(item) => {
              setGender(item.value)
            }}
          />
        </View>
        <View className='mb-4'>
          <Text className='text-gray-600 text-base'>Date Of Birth</Text>
          {show && <DateTimePicker testID='dateTimePicker' value={dob} mode={'date'} onChange={handleDateChange} />}
          <TextInput
            className='border-gray-300 border-b py-2 text-base focus:border-green-500 font-semibold'
            placeholder='Date Of Birth'
            value={dob.toLocaleString()}
            keyboardType='default'
            autoCapitalize='none'
            onPress={showDatePicker}
          />
        </View>
        <TouchableOpacity className='bg-green-700 rounded-lg py-3 shadow-xl mt-5' onPress={handleEditProfile}>
          <Text className='text-center text-white font-bold text-lg'>Save</Text>
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
    fontWeight: 600
  },
  iconStyle: {
    width: 20,
    height: 20
  }
})
