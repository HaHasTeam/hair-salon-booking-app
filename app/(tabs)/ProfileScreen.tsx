import { useUserProfile } from '@/api/customer'
import React, { useCallback } from 'react'
import { View, Text, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native'
import UserAvatar from '@/components/Avatar'
import Feather from '@expo/vector-icons/Feather'
import Fontisto from '@expo/vector-icons/Fontisto'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

const ProfileScreen = () => {
  const { data: profile, error, isLoading } = useUserProfile()
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  // Use useFocusEffect to refetch the profile when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Invalidate and refetch the profile query when screen is focused
      queryClient.invalidateQueries(['profile'])
    }, [queryClient])
  )

  if (isLoading) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }

  if (error) {
    console.log(error)
    return <Text className='mt-28'>{error.message}</Text>
  }
  console.log('profile', profile)

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='w-full px-2 mt-9 flex-row items-center'>
        {/* Icon Container */}
        <TouchableOpacity className='flex-none'>
          <Ionicons name='chevron-back' size={24} color='black' />
        </TouchableOpacity>

        {/* Spacer View to push Text to center */}
        <View className='flex-1'></View>

        {/* Title Text */}
        <Text className='text-green-600 text-lg font-bold text-center'>Profile</Text>

        {/* Spacer View to push Text to center */}
        <View className='flex-1'></View>

        {/* Extra View for spacing */}
        <View className='flex-none w-6'></View>
      </View>
      <View className='px-4'>
        <View className='mt-3 items-center justify-center'>
          <UserAvatar
            src={
              profile?.gender === 'Female'
                ? require('@/assets/images/avatar-female.png')
                : require('@/assets/images/avatar-male.png')
            }
            alt={profile?.firstName}
            name={`${profile?.firstName} ${profile?.lastName}`}
            size='xxl'
          />
        </View>
        {(profile?.firstName !== '' || profile?.lastName !== '') && (
          <Text className='text-base mt-2 font-bold text-center text-lg'>
            {profile?.firstName} {profile?.lastName}
          </Text>
        )}

        <Text className='mt-2 text-center text-gray-500'>@{profile?.email}</Text>

        <View className='px-5 my-4'>
          <TouchableOpacity
            className='bg-green-100 rounded-lg p-4 shadow-xl flex flex-row items-center'
            onPress={() => navigation.navigate('(profile)/EditProfile')}
          >
            <FontAwesome name='edit' size={24} color='gray' className='items-center' />
            <Text className='ml-3 text-base font-medium text-gray-700'>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='bg-green-100 rounded-lg p-4 shadow-xl flex flex-row items-center my-4'
            onPress={() => navigation.navigate('(profile)/ChangePassword')}
          >
            <FontAwesome name='expeditedssl' size={24} color='gray' />
            <Text className='ml-3 text-base font-medium text-gray-700'>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='bg-green-100 rounded-lg p-4 shadow-xl flex flex-row items-center'
            onPress={() => {}}
          >
            <AntDesign name='logout' size={24} color='red' className='mr-2' />
            <Text className='ml-3 text-base font-medium text-gray-700'>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen
