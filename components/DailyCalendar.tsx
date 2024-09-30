import { type Dispatch, type SetStateAction, useState } from 'react'

import { getThu } from '@/utils/utils'
import { Button, HStack, Pressable, Text, View } from 'native-base'
import { ITimeSlot } from '@/types/Slot'

interface CalendarDailyProps {
  setDay: Dispatch<SetStateAction<Date>>
  setSelectedSlots: Dispatch<SetStateAction<ITimeSlot[] | []>>
  setSelectedCourts: Dispatch<SetStateAction<[]>>
  setStartSlot: Dispatch<SetStateAction<ITimeSlot | null>>
  setEndSlot: Dispatch<SetStateAction<ITimeSlot | null>>
}

export default function CalendarDaily({
  setDay,
  setSelectedSlots,
  setStartSlot,
  setEndSlot,
  setSelectedCourts
}: CalendarDailyProps) {
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(0)
  const daysInWeek = 7
  const days = Array.from(
    { length: daysInWeek },
    (_, i) => new Date(new Date().getTime() + (i + currentWeek * daysInWeek) * 24 * 60 * 60 * 1000)
  )
  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1)
    // setSelectedDay(new Date(selectedDay.getTime() - 7 * 24 * 60 * 60 * 1000));
  }
  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1)
    // setSelectedDay(new Date(selectedDay.getTime() + 7 * 24 * 60 * 60 * 1000));
  }
  const handleDaySelect = (day: Date): void => {
    setSelectedSlots([])
    setSelectedCourts([])
    setStartSlot(null)
    setEndSlot(null)
    setSelectedDay(day)
    setDay(day)
  }
  return (
    <View className='flex flex-col items-center gap-4'>
      <HStack flexWrap={'wrap'} justifyContent={'center'}>
        {days.map((day) => (
          <Pressable
            key={day.getDate()}
            variant={
              day.getDate() === selectedDay.getDate() && day.getMonth() === selectedDay.getMonth() ? 'default' : 'ghost'
            }
            size='lg'
            className={`flex h-10 w-1/5 items-center justify-center rounded-md m-2 border ${
              day.getDate() === selectedDay.getDate() &&
              day.getMonth() === selectedDay.getMonth() &&
              ' bg-green-300 text-green-500'
            }`}
            onPress={() => handleDaySelect(day)}
            disabled={day.getTime() < new Date().getTime()}
          >
            <View className='flex flex-col items-center '>
              <Text
                className={`${
                  day.getDate() === selectedDay.getDate() && day.getMonth() === selectedDay.getMonth()
                    ? 'text-yellow-700'
                    : 'text-stone-900'
                }`}
              >
                {`${day.getDate()} - ${day.toLocaleString('default', {
                  month: 'short'
                })}`}
              </Text>
              <Text className='text-xs text-gray-500 dark:text-slate-400'>{getThu(day)}</Text>
            </View>
          </Pressable>
        ))}
      </HStack>
      <HStack space={3}>
        <Button
          size='sm'
          variant='outline'
          colorScheme={'green'}
          onPress={handlePreviousWeek}
          disabled={currentWeek === 0 && days[0].getTime() <= new Date().getTime()}
        >
          Previous Week
        </Button>
        <Button size='sm' variant='solid' colorScheme={'green'} onPress={handleNextWeek}>
          Next Week
        </Button>
      </HStack>
    </View>
  )
}
