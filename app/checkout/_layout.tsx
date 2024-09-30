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
              <Pressable
              // onPress={() => {
              //   navigation.setOptions({
              //     scrollToTopEnabled: true
              //   })
              // }}
              >
                <Text
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontSize={'2xl'}
                  fontWeight={'bold'}
                  color={'green.400'}
                  padding={2}
                >
                  Checkout
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
