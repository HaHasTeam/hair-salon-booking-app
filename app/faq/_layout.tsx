import { Stack, useNavigation } from 'expo-router'
import { Pressable, Text } from 'native-base'
import { Link } from 'expo-router'
export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Help Desk'
        }}
      />
    </Stack>
  )
}
