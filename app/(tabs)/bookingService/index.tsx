import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Actionsheet, Button, HStack, Pressable, Text, useDisclose, View, Box, Flex, Badge } from 'native-base'
import { StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import { useRouter } from 'expo-router'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar, CalendarUtils, DateData } from 'react-native-calendars'
import { useGetCourtAvailable } from '@/api/courts'
import { TimeSlot } from '@/components/TimeSlot'
import { ISlot, ITimeSlot } from '@/types/Slot'
import { ICourt } from '@/types/Court'
import { useBranchDetail } from '@/api/branchs'
import { format } from 'date-fns'
import { calculateTotalServicePrice, getThu } from '@/utils/utils'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'

const BookingService = () => {
  const router = useRouter()
  const { bookingData } = useCheckoutStore()
  console.log('bookingData', bookingData.selectedBrach?._id)

  const { data: branchDetail } = useBranchDetail({ id: bookingData.selectedBrach?._id })
  const { isOpen, onOpen, onClose } = useDisclose()
  const [selectDay, setSelectDay] = useState(new Date())
  const [startSlot, setStartSlot] = useState<ITimeSlot | null>(null)
  const [endSlot, setEndSlot] = useState<ITimeSlot | null>(null)
  const [selectedSlots, setSelectedSlots] = useState<ITimeSlot[] | []>([])

  const [selectedCourt, setSelectedCourt] = useState<ICourt | null>(null)
  const [selectedServices, setSelectedServices] = useState<ICourt[] | null>([])
  // console.log('branchDetail', branchDetail)

  const { mutate: getCourtAvailable, data: StylistData } = useGetCourtAvailable()

  const getDate = (count: number) => {
    const date = new Date()
    const newDate = date.setDate(date.getDate() + count)
    return CalendarUtils.getCalendarDateString(newDate)
  }

  const onDayPress = useCallback((day: DateData) => {
    setSelectDay(new Date(day.dateString))
  }, [])
  const timeSlots = useMemo(() => {
    if (branchDetail) {
      const slotArray = branchDetail?.slots?.filter((el: ISlot) => el.weekDay.includes(getThu(new Date(selectDay))))
      return slotArray
    } else {
      return []
    }
  }, [branchDetail?.slots, selectDay])
  const marked = useMemo(() => {
    return {
      [selectDay.toISOString().split('T')[0]]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
        selectedTextColor: 'red'
      }
    }
  }, [selectDay])
  console.log('stylist ', StylistData)

  useEffect(() => {
    if (selectDay && selectedSlots.length !== 0) {
      getCourtAvailable({
        branch: branchDetail?._id,
        slots: selectedSlots.map((el) => el._id),
        date: format(selectDay?.toString(), 'yyyy-MM-dd')
      })
    }
  }, [getCourtAvailable, selectDay, selectedSlots])
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
                  {!branchDetail && <Entypo name='dot-single' size={30} color='red' style={styles.dotIcon} />}
                  <TabBarIcon size={22} name={'home-sharp'} color={'#989595'} style={styles.homeIcon} />
                </View>
                <Text fontSize={'sm'} color={'gray.700'}>
                  {branchDetail ? branchDetail.name : 'Xem tất cả salon'}
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
          <Pressable
            onPress={() => {
              router.push('/(tabs)/bookingService/ChooseService')
            }}
            isDisabled={branchDetail ? false : true}
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
                  {branchDetail && <Entypo name='dot-single' size={30} color='red' style={styles.dotIcon} />}
                  <TabBarIcon size={22} name={'cut'} style={styles.rotate} color={'#989595'} />
                </View>
                <Text fontSize={'sm'} color={'gray.700'}>
                  {bookingData.service?.length > 0
                    ? 'Đã chọn ' + bookingData.service?.length + ' dịch vụ'
                    : ' Xem tất cả dịch vụ hấp dẫn'}
                </Text>
              </HStack>
              <TabBarIcon size={20} name={'arrow-forward'} color={'#989595'} />
            </HStack>
          </Pressable>

          {bookingData.service?.length > 0 && (
            <>
              <Flex wrap='wrap' direction='row' width={'full'} marginTop={2}>
                {bookingData?.service?.map((el) => {
                  return (
                    <Badge colorScheme={'blue'} width={'1/3'} margin={1}>
                      {el.name}
                    </Badge>
                  )
                })}
              </Flex>
              <View marginTop={1}>
                <Text>
                  Tổng Tiền: {calculateTotalServicePrice(bookingData.service)} /{bookingData.service?.length}h
                </Text>
              </View>
            </>
          )}
        </View>
        {/* Chọn Ngày giờ */}
        <View>
          <Text fontSize={'xl'} color={'green.700'}>
            3. Chọn ngày, giờ & stylist
          </Text>
          <Pressable
            onPress={() => onOpen}
            isDisabled={branchDetail?._id && bookingData.service?.length > 0 ? false : true}
          >
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
                  {selectDay.toLocaleDateString('vi-VN', {
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
          {branchDetail && (
            <TimeSlot
              title='Chọn thời gian cắt'
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
              timeSlotData={timeSlots}
              selectDay={selectDay}
              endSlot={endSlot}
              startSlot={startSlot}
              setEndSlot={setEndSlot}
              setStartSlot={setStartSlot}
            />
          )}

          <View>{StylistData && StylistData.map((el) => <Text>{el._id}</Text>)}</View>
        </View>

        <Button colorScheme={'green'} isDisabled>
          Chốt Giờ Cắt
        </Button>
        <Text textAlign={'center'} color={'gray.400'}>
          Cắt xong trả tiền, hủy lịch không sao
        </Text>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w='100%' px={4} justifyContent='center'>
              <Text>Chọn ngày bạn muốn </Text>
              <Calendar
                // testID={'first_calendar'}
                enableSwipeMonths
                current={new Date().toJSON()}
                style={stylesCalendar.calendar}
                onDayPress={onDayPress}
                markedDates={marked}
                minDate={getDate(0)}
                maxDate={getDate(30)}
              />
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </View>
  )
}

export default BookingService
const stylesCalendar = StyleSheet.create({
  calendar: {
    marginBottom: 10
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  },
  switchText: {
    margin: 10,
    fontSize: 16
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
  disabledText: {
    color: 'grey'
  },
  defaultText: {
    color: 'purple'
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  customDay: {
    textAlign: 'center'
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2'
  }
})
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
