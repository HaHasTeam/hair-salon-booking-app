import { useUserProfile } from '@/api/customer'
import React, { useCallback } from 'react'
import { View, Text, ActivityIndicator, Touchable, TouchableOpacity, Image } from 'react-native'
import UserAvatar from '@/components/Avatar'
import Feather from '@expo/vector-icons/Feather'
import Fontisto from '@expo/vector-icons/Fontisto'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import ParallaxScrollView from '@/components/ParallaxScrollView'

const ProfileScreen = () => {
  const { data: profile, error, isLoading } = useUserProfile()
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(['profile'])
    }, [queryClient])
  )

  if (isLoading) {
    return <ActivityIndicator size='large' color='#00ff00' />
  }

  if (error) {
    console.log(error)
    return <Text className='mt-28'>{error.message}</Text>
  }
  console.log('profile', profile)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/profile.jpg')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
          }}
        />
      }
    >
      <SafeAreaView className='flex-1 bg-white'>
        <Text className='text-green-600 text-lg font-bold text-center mt-3'>Profile</Text>
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
    </ParallaxScrollView>
  )
}

export default ProfileScreen
