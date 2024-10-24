import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Button, HStack, Pressable, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { useRouter } from 'expo-router'
const BookingService = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Chọn Salon */}
        <View>
          <Text fontSize={'xl'} color={'green.700'}>
            1. Chọn Salon
          </Text>
          <Pressable
            onPress={() => {
              router.push('/(tabs)/bookingService/ChooseSalon')
            }}
          >
            <HStack
              justifyContent={'space-between'}
              space={3}
              backgroundColor={'coolGray.300'}
              borderRadius={4}
              padding={4}
            >
              <HStack justifyContent={'flex-start'} alignItems={'flex-start'} space={2}>
                <View position={'relative'}>
                  <Entypo name='dot-single' size={30} color='red' style={styles.dotIcon} />
                  <TabBarIcon size={22} name={'home-sharp'} color={'#989595'} style={styles.homeIcon} />
                </View>
                <Text fontSize={'sm'} color={'gray.700'}>
                  Xem tất cả salon
                </Text>
              </HStack>
              <TabBarIcon size={20} name={'arrow-forward'} color={'#989595'} />
            </HStack>
          </Pressable>
        </View>
        {/* Chọn dịch vụ */}
        <View>
          <Text fontSize={'xl'} color={'green.700'}>
            2. Chọn dịch vụ
          </Text>
          <Pressable>
            <HStack
              justifyContent={'space-between'}
              space={3}
              backgroundColor={'coolGray.300'}
              borderRadius={4}
              padding={4}
            >
              <HStack justifyContent={'flex-start'} alignItems={'flex-start'} space={2}>
                <TabBarIcon size={22} name={'cut'} style={styles.rotate} color={'#989595'} />
                <Text fontSize={'sm'} color={'gray.700'}>
                  Xem tất cả dịch vụ hấp dẫn
                </Text>
              </HStack>
              <TabBarIcon size={20} name={'arrow-forward'} color={'#989595'} />
            </HStack>
          </Pressable>
        </View>
        {/* Chọn Ngày giờ */}
        <View>
          <Text fontSize={'xl'} color={'green.700'}>
            3. Chọn ngày, giờ & stylist
          </Text>
          <Pressable>
            <HStack
              justifyContent={'space-between'}
              space={3}
              backgroundColor={'coolGray.300'}
              borderRadius={4}
              padding={4}
            >
              <HStack justifyContent={'flex-start'} alignItems={'flex-start'} space={2}>
                <TabBarIcon size={22} name={'calendar-sharp'} color={'#989595'} />
                <Text fontSize={'sm'} color={'gray.700'}>
                  {new Date().toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </HStack>
              <TabBarIcon size={20} name={'arrow-forward'} color={'#989595'} />
            </HStack>
          </Pressable>
        </View>

        <Button colorScheme={'green'} isDisabled>
          Chốt Giờ Cắt
        </Button>
        <Text textAlign={'center'} color={'gray.400'}>
          Cắt xong trả tiền, hủy lịch không sao
        </Text>
      </View>
    </View>
  )
}

export default BookingService
const styles = StyleSheet.create({
  homeIcon: { position: 'relative', zIndex: 1 },
  dotIcon: {
    position: 'absolute',
    // start: 5,
    // end: 5,
    left: 10,
    bottom: 3,
    zIndex: 2
  },
  rotate: {
    transform: [{ rotate: '-90deg' }]
  },
  container: {
    flex: 1
  },
  header: {
    height: 250,
    overflow: 'hidden'
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden'
  }
})
