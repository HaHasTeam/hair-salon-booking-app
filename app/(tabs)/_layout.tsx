import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import TabBarCustom from '@/components/TabBarCustom'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      tabBar={(props) => <TabBarCustom {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'receipt' : 'receipt-outline'} color={color} />
        }}
      />

      {/* <Tabs.Screen
        name='LoginRegisterScreen'
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle-outline' : 'person-circle-outline'} color={color} />
          )
        }}
      /> */}

      <Tabs.Screen
        name='branchs'
        options={{
          title: 'Cuawr',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'tennisball-outline' : 'tennisball-outline'} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='ProfileScreen'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle-outline' : 'person-circle-outline'} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
