import { Stack, useNavigation } from 'expo-router'
import { Pressable, Text } from 'native-base'

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: () => {
            const navigation = useNavigation()
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('index')
                  navigation.setOptions({
                    scrollToTopEnabled: true
                  })
                }}
              >
                <Text fontSize={'2xl'} fontWeight={'bold'} color={'tomato'} padding={2}>
                  PickleBall
                </Text>
              </Pressable>
            )
          },
          headerShadowVisible: false
        }}
      />
    </Stack>
  )
}
