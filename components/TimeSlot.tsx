import { type Dispatch, type SetStateAction, useMemo } from 'react'

import type { ISlot, ITimeSlot } from '@/types/Slot'
import { View, Button, Text, Stack, HStack, VStack } from 'native-base'

export const TimeSlot = ({
  timeSlotData,
  setStartSlot,
  setEndSlot,
  startSlot,
  endSlot,
  setSelectedSlots,
  selectedSlots,
  selectDay,
  title = 'Book a Court'
}: {
  timeSlotData: ISlot[]
  setStartSlot: Dispatch<SetStateAction<ITimeSlot | null>>
  selectDay: Date
  startSlot: ITimeSlot | null
  endSlot: ITimeSlot | null
  selectedSlots: ITimeSlot[]
  title: string
  setEndSlot: Dispatch<SetStateAction<ITimeSlot | null>>
  setSelectedSlots: Dispatch<SetStateAction<ITimeSlot[] | []>>
}) => {
  // const [date, setDate] = useState(new Date());

  const timeSlots = useMemo(() => {
    const slots = [] as ITimeSlot[]

    if (timeSlotData?.length !== 0) {
      for (const slot of timeSlotData) {
        const startTime = new Date(
          selectDay.getFullYear(),
          selectDay.getMonth(),
          selectDay.getDate(),
          parseInt(slot.startTime?.split(':')[0] ?? '0', 10),
          parseInt(slot.startTime?.split(':')[1] ?? '1', 10)
        )
        const endTime = new Date(
          selectDay.getFullYear(),
          selectDay.getMonth(),
          selectDay.getDate(),
          parseInt(slot.endTime?.split(':')[0] ?? '0', 10),
          parseInt(slot.endTime?.split(':')[1] ?? '1', 10)
        )

        const startTimeString = startTime
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          .replace(/^0/, '')

        const endTimeString = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0/, '')

        slots.push({
          ...slot,
          isInThePass: endTime < new Date(),
          timeDisplay: `${startTimeString}-${endTimeString}`
        })
      }
      return slots
    }

    return slots
  }, [selectDay, timeSlotData])
  const toggleSlot = (slot: ITimeSlot) => {
    const slotIndex = timeSlots.indexOf(slot)
    if (!startSlot) {
      setStartSlot(slot)
      setSelectedSlots([slot])
    } else if (!endSlot) {
      const startIndex = timeSlots.indexOf(startSlot)
      const endIndex = slotIndex
      setEndSlot(slot)
      setSelectedSlots(timeSlots.slice(startIndex <= endIndex ? startIndex : endIndex, endIndex + 1))
    } else if (slot === startSlot) {
      setStartSlot(null)
      setEndSlot(null)
      setSelectedSlots([])
    } else {
      const startIndex = timeSlots.indexOf(startSlot)
      const endIndex = timeSlots.indexOf(slot)
      setEndSlot(slot)
      setSelectedSlots(timeSlots.slice(startIndex <= endIndex ? startIndex : endIndex, endIndex + 1))
    }
  }

  return (
    <VStack alignItems={'center'} justifyContent={'center'} className='border'>
      <Text className='mb-3 text-2xl font-bold'>{title}</Text>

      <HStack flexWrap={'wrap'} alignItems={'center'}>
        {timeSlots.length !== 0 ? (
          timeSlots.map((slot) => (
            <Button
              disabled={slot.isInThePass}
              key={slot.timeDisplay}
              variant={
                selectedSlots.includes(slot)
                  ? 'solid'
                  : startSlot === slot ||
                      (startSlot &&
                        endSlot &&
                        timeSlots.indexOf(slot) >=
                          (timeSlots.indexOf(startSlot) <= timeSlots.indexOf(endSlot)
                            ? timeSlots.indexOf(startSlot)
                            : timeSlots.indexOf(endSlot)) &&
                        timeSlots.indexOf(slot) <=
                          (timeSlots.indexOf(startSlot) <= timeSlots.indexOf(endSlot)
                            ? timeSlots.indexOf(endSlot)
                            : timeSlots.indexOf(startSlot)))
                    ? 'outline'
                    : 'outline'
              }
              className={`h-12 w-1/3 p-0 text-xs  rounded-md   ${
                selectedSlots.includes(slot)
                  ? 'bg-green-800 text-green-200'
                  : startSlot === slot ||
                      (startSlot &&
                        endSlot &&
                        timeSlots.indexOf(slot) >=
                          (timeSlots.indexOf(startSlot) <= timeSlots.indexOf(endSlot)
                            ? timeSlots.indexOf(startSlot)
                            : timeSlots.indexOf(endSlot)) &&
                        timeSlots.indexOf(slot) <=
                          (timeSlots.indexOf(startSlot) <= timeSlots.indexOf(endSlot)
                            ? timeSlots.indexOf(endSlot)
                            : timeSlots.indexOf(startSlot)))
                    ? 'hover:bg-muted'
                    : 'text-muted-foreground'
              }`}
              onPress={() => toggleSlot(slot)}
            >
              <Text>{slot.timeDisplay}</Text>
            </Button>
          ))
        ) : (
          <View>
            <Text>There is no time to play</Text>
          </View>
        )}
      </HStack>
    </VStack>
  )
}
