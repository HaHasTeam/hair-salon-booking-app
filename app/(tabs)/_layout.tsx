import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import TabBarCustom from '@/components/TabBarCustom'
import { useAuth } from '@/provider/AuthProvider'
export default function TabLayout() {
  const { accessToken } = useAuth()
  console.log('access token', accessToken)

  return (
    <Tabs
      // tabBar={(props) => <TabBarCustom {...props} />}
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
        }}
      />

      <Tabs.Screen
        name='ProfileScreen'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle-outline' : 'person-circle-outline'} color={color} />
          ),
          tabBarItemStyle: {
            display: accessToken ? 'flex' : 'none'
          }
        }}
      />
      <Tabs.Screen
        name='LoginRegisterScreen'
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle-outline' : 'person-circle-outline'} color={color} />
          ),
          tabBarItemStyle: {
            display: accessToken ? 'none' : 'flex'
          },
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
      <Tabs.Screen
        name='bookingService'
        options={{
          title: 'Đặt lịch giữ chỗ',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={'calendar'} color={color} />,
          tabBarItemStyle: {
            display: accessToken ? 'flex' : 'none'
          },
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
      <Tabs.Screen
        name='branchs'
        options={{
          title: 'Branch',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'tennisball-outline' : 'tennisball-outline'} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
