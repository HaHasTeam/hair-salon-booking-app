import { Image } from 'react-native'
import ParallaxScrollView from '../../components/ParallaxScrollView'
import CalendarDaily from '@/components/DailyCalendar'
import { useMemo, useState } from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { useBranchDetail } from '@/api/branchs'
import { Text } from 'native-base'
import { TimeSlot } from '@/components/TimeSlot'
import { ISlot, ITimeSlot } from '@/types/Slot'
import { getThu } from '@/utils/utils'
const BookingPage = () => {
  const { id: branchId } = useLocalSearchParams<{ id: string }>()
  const {
    data: branchDetail,
    isLoading: isBranchDetailLoading,
    isError: isBranchError
  } = useBranchDetail({ id: branchId })
  const [selectDay, setSelectDay] = useState<Date>(new Date())
  const [startSlot, setStartSlot] = useState<ITimeSlot | null>(null)
  const [endSlot, setEndSlot] = useState<ITimeSlot | null>(null)
  const [selectedSlots, setSelectedSlots] = useState<ITimeSlot[] | []>([])
  const [selectedCourts, setSelectedCourts] = useState<[]>([])
  console.log('selectedSlots', selectedSlots)

  const timeSlots = useMemo(() => {
    const slotArray = branchDetail.slots?.filter((el: ISlot) => el.weekDay.includes(getThu(selectDay)))
    return slotArray
  }, [branchDetail.slots, selectDay])
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
        <Text>{branchDetail.name}</Text>
        <CalendarDaily
          setSelectedCourts={setSelectedCourts}
          setSelectedSlots={setSelectedSlots}
          setDay={setSelectDay}
          setEndSlot={setEndSlot}
          setStartSlot={setStartSlot}
        />
        <TimeSlot
          title='Choose Court to play'
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          timeSlotData={timeSlots}
          selectDay={selectDay}
          endSlot={endSlot}
          startSlot={startSlot}
          setEndSlot={setEndSlot}
          setStartSlot={setStartSlot}
        />
      </ParallaxScrollView>
    </>
  )
}

export default BookingPage
