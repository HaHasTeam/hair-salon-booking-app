import { ActivityIndicator, Image, StyleSheet } from 'react-native'
import ParallaxScrollView from '../../components/ParallaxScrollView'
import CalendarDaily from '@/components/DailyCalendar'
import { useEffect, useMemo, useState } from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { useBranchDetail } from '@/api/branchs'
import { Button, HStack, Pressable, Text, View } from 'native-base'
import { TimeSlot } from '@/components/TimeSlot'
import { ISlot, ITimeSlot } from '@/types/Slot'
import { calculateTotalPrice, formatToVND, getThu } from '@/utils/utils'
import { format } from 'date-fns'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
import { useGetCourtAvailable } from '@/api/courts'
import { ICourt } from '@/types/Court'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BadgeCustom from '@/components/BadgeCustom'
import { useNavigation } from 'expo-router'
const BookingPage = () => {
  const { id: branchId } = useLocalSearchParams<{ id: string }>()
  const navigate = useNavigation()
  const {
    data: branchDetail,
    isLoading: isBranchDetailLoading,
    isError: isBranchError
  } = useBranchDetail({ id: branchId })
  const { setBookingData } = useCheckoutStore()
  const { mutate: getCourtAvailable, data: CourtData, isPending: isCourtPending } = useGetCourtAvailable()
  const [selectDay, setSelectDay] = useState<Date>(new Date())
  const [startSlot, setStartSlot] = useState<ITimeSlot | null>(null)
  const [endSlot, setEndSlot] = useState<ITimeSlot | null>(null)
  const [selectedSlots, setSelectedSlots] = useState<ITimeSlot[] | []>([])
  const [selectedCourts, setSelectedCourts] = useState<[]>([])
  const [selectedCourt, setSelectedCourt] = useState<ICourt | null>(null)
  console.log('selectedSlots', selectedSlots)

  const timeSlots = useMemo(() => {
    const slotArray = branchDetail.slots?.filter((el: ISlot) => el.weekDay.includes(getThu(selectDay)))
    return slotArray
  }, [branchDetail.slots, selectDay])
  const handleCourtSelection = (court: ICourt) => {
    if (selectedCourt?._id === court._id) {
      setSelectedCourt(null)
    } else {
      setSelectedCourt(court)
    }
  }
  useEffect(() => {
    if (selectDay && selectedSlots.length !== 0) {
      getCourtAvailable({
        branch: branchId,
        slots: selectedSlots.map((el) => el._id),
        date: format(selectDay?.toString(), 'yyyy-MM-dd')
      })
    }
  }, [getCourtAvailable, selectDay, selectedSlots, branchId])
  const handleBooking = async () => {
    if (selectedCourt !== null || selectedCourts.length !== 0) {
      setBookingData({
        booking: {
          type: 'single_schedule',
          paymentType: 'haft',
          paymentMethod: 'vnpay',
          totalPrice: calculateTotalPrice(selectedSlots, selectedCourt.price),
          totalHour: selectedSlots.length,
          startDate: format(selectDay.toString(), 'yyyy-MM-dd'),
          endDate: format(selectDay.toString(), 'yyyy-MM-dd'),
          court: selectedCourt ?? ''
        },
        schedule: {
          type: 'booking',
          slots: selectedSlots.map((el) => el._id),
          startTime: startSlot.startTime,
          endTime: endSlot ? endSlot.endTime : startSlot.endTime,
          date: format(selectDay.toString(), 'yyyy-MM-dd'),
          court: selectedCourt
        }
      })
      navigate.navigate('checkout')
    }
  }
  if (isBranchDetailLoading) {
    return <ActivityIndicator size='large' />
  }
  if (isBranchError) {
    return <Redirect href={'..'} />
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: '' }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={{
              height: 178,
              width: 290,
              bottom: 0,
              left: 0,
              position: 'absolute'
            }}
          />
        }
      >
        <Text className='text-2xl font-bold'>{branchDetail.name}</Text>
        <CalendarDaily
          setSelectedCourts={setSelectedCourts}
          setSelectedSlots={setSelectedSlots}
          setDay={setSelectDay}
          setEndSlot={setEndSlot}
          setStartSlot={setStartSlot}
        />
        <TimeSlot
          title='Choose Time to play'
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          timeSlotData={timeSlots}
          selectDay={selectDay}
          endSlot={endSlot}
          startSlot={startSlot}
          setEndSlot={setEndSlot}
          setStartSlot={setStartSlot}
        />
        <View>
          {selectedSlots.length !== 0 && (
            <View className=''>
              <Text className='mb-2 text-lg font-bold'>Select Court</Text>

              {CourtData?.data?.length === 0 ? (
                <View>
                  <Text>Empty Court</Text>
                </View>
              ) : (
                <View className=''>
                  {isCourtPending ? (
                    <View className='my-2'>
                      <ActivityIndicator size='small' />
                    </View>
                  ) : (
                    CourtData?.map((court: ICourt) => (
                      <Pressable
                        style={styles.container}
                        key={court._id}
                        className={` border my-2 ${
                          selectedCourt !== null && selectedCourt._id === court._id
                            ? 'bg-slate-600 text-slate-800'
                            : 'hover:bg-muted'
                        }`}
                        onPress={() => handleCourtSelection(court)}
                      >
                        <View
                          style={{ padding: 10 }}
                          className={`${
                            selectedCourt !== null && selectedCourt._id === court._id
                              ? 'bg-green-600 text-slate-300 w-full'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <HStack space={1} justifyContent='start' alignItems={'center'}>
                            <MaterialCommunityIcons
                              name='soccer-field'
                              size={24}
                              color={selectedCourt !== null && selectedCourt._id === court._id ? '#fff' : '#2d2d2d'}
                            />
                            <Text
                              style={styles.title}
                              className={`${
                                selectedCourt !== null && selectedCourt._id === court._id ? ' text-slate-300 ' : ''
                              }`}
                            >
                              {court.name}
                            </Text>
                          </HStack>
                          <Text
                            style={styles.time}
                            className={`${
                              selectedCourt !== null && selectedCourt._id === court._id
                                ? ' text-slate-300 '
                                : 'text-slate-500'
                            }`}
                            numberOfLines={2}
                          >
                            {court.description}
                          </Text>
                          <HStack space={3} justifyContent='space-between' className='my-1'>
                            <BadgeCustom status={court.status} />
                            <View>
                              <Text
                                className={`${
                                  selectedCourt !== null && selectedCourt._id === court._id
                                    ? ' text-slate-300 '
                                    : 'text-slate-500'
                                }`}
                              >
                                Type: {court.type}
                              </Text>
                            </View>
                          </HStack>
                          <View>
                            <Text
                              className={`text-lg text-slate-500 font-light ${
                                selectedCourt !== null && selectedCourt._id === court._id
                                  ? ' text-slate-300 '
                                  : 'text-slate-500'
                              }`}
                            >
                              {formatToVND(court.price)}/hr
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    ))
                  )}
                </View>
              )}

              <Button
                className='bg-green-700 text-green-600 font-bold'
                disabled={selectedCourt == null}
                onPress={handleBooking}
              >
                Book Selected Court
              </Button>
            </View>
          )}
        </View>
      </ParallaxScrollView>
    </>
  )
}

export default BookingPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5
  },
  time: {
    // color: 'gray'
  },
  status: {
    fontWeight: '500'
  }
})
