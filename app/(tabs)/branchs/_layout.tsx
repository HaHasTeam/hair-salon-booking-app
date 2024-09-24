import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { StackScreenWithSearchBar } from '@/constants/layout'
import { Stack } from 'expo-router'

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />

      <Stack.Screen
        name='[id]'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
