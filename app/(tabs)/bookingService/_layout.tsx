import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
import { Stack, useRouter } from 'expo-router'

import { Box, Flex, HStack, Pressable, Text, View } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'
export default function MenuStack() {
  const router = useRouter()
  const { resetBookingData, setBookingData } = useCheckoutStore()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: () => {
            return (
              <View width={'full'} position={'relative'}>
                {/* <Link href={'/(tabs)/branchs'}> */}
                <TouchableOpacity
                  // position={'absolute'}
                  // zIndex={10}
                  style={styles.btnHome}
                  onPress={() => {
                    setBookingData({
                      booking: null,
                      paymentType: 'full',
                      schedule: null,
                      selectedBrach: null,
                      service: []
                    })
                    // router.dismiss()
                    router.navigate('/(tabs)/')
                  }}
                >
                  <TabBarIcon name={'home'} color={'#989595'} />
                </TouchableOpacity>
                {/* </Link> */}
                <Text fontSize={'xl'} fontWeight={'bold'} color={'green.400'} textAlign={'center'}>
                  Đặt lịch giữ chỗ
                </Text>
              </View>
            )
          },
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name='ChooseSalon'
        options={{
          // title: 'Chọn Salon',
          // headerTitleAlign: 'center',
          // headerTitleStyle: {
          //   color: 'green.600'
          // },
          headerBackVisible: false,
          headerTitle: () => {
            return (
              <View width={'full'} position={'relative'}>
                {/* <Link href={'/(tabs)/branchs'}> */}
                <TouchableOpacity
                  // position={'absolute'}
                  // zIndex={10}
                  style={styles.btnHome}
                  onPress={() => {
                    // router.navigate('/(tabs)/branchs')
                    router.dismiss()
                  }}
                >
                  <TabBarIcon name={'arrow-back'} color={'#989595'} />
                </TouchableOpacity>
                {/* </Link> */}
                <Text fontSize={'xl'} fontWeight={'bold'} color={'green.400'} textAlign={'center'}>
                  Chọn Salon
                </Text>
              </View>
            )
          },

          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name='ChooseService'
        options={{
          // title: 'Chọn Salon',
          // headerTitleAlign: 'center',
          // headerTitleStyle: {
          //   color: 'green.600'
          // },
          // headerBackVisible: false,
          headerTitle: () => {
            return (
              <View width={'full'} display={'flex'}>
                {/* <Link href={'/(tabs)/branchs'}> */}
                {/* <TouchableOpacity
                  // position={'absolute'}
                  // zIndex={10}

                  onPress={() => {
                    // router.navigate('/(tabs)/branchs')
                    router.dismissAll()
                  }}
                >
                  <TabBarIcon name={'arrow-back'} color={'#989595'} />
                </TouchableOpacity> */}
                {/* </Link> */}
                <Text fontSize={'xl'} fontWeight={'bold'} color={'green.400'}>
                  Chọn dịch vụ
                </Text>
              </View>
            )
          },

          headerShadowVisible: false
        }}
      />
    </Stack>
  )
}
const styles = StyleSheet.create({
  btnHome: {
    position: 'absolute',
    zIndex: 10
  }
})
