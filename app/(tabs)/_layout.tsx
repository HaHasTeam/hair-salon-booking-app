import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import TabBarCustom from '@/components/TabBarCustom'
import { useAuth } from '@/provider/AuthProvider'
export default function TabLayout() {
  const { accessToken, profile } = useAuth()
  console.log('profile 11', profile)

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
        name='receipt'
        options={{
          title: 'Booking Receipts',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'receipt' : 'receipt-outline'} color={color} />
          ),
          tabBarItemStyle: {
            display: ['Customer'].includes(profile?.role) ? 'flex' : 'none'
          }
        }}
      />
      <Tabs.Screen
        name='bookingService'
        options={{
          title: 'Booking',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={'calendar'} color={color} />,
          tabBarItemStyle: {
            display: ['Customer'].includes(profile?.role) ? 'flex' : 'none'
          },
          tabBarStyle: {
            display: 'none'
          }
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
        name='branchs'
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'location' : 'location-outline'} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name='QrCode'
        options={{
          title: 'QrCode',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'qr-code-outline' : 'qr-code'} color={color} />
          ),
          tabBarItemStyle: {
            display: ['Staff'].includes(profile?.role) ? 'flex' : 'none'
          }
        }}
      />
    </Tabs>
  )
}
