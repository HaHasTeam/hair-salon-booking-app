import { Stack, useNavigation } from 'expo-router'
import { Pressable, Text } from 'native-base'
import { Link } from 'expo-router'
export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: () => {
            const navigation = useNavigation()
            return (
              <Link href={'/(tabs)/branchs'}>
                <Pressable
                // onPress={() => {
                //   navigation.setOptions({
                //     scrollToTopEnabled: true
                //   })
                // }}
                >
                  <Text fontSize={'2xl'} fontWeight={'bold'} color={'green.400'} padding={2}>
                    Address
                  </Text>
                </Pressable>
              </Link>
            )
          },
          headerShadowVisible: false
        }}
      />
    </Stack>
  )
}
