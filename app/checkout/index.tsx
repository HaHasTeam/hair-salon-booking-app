import { Button, CheckIcon, HStack, Select, Text, View, VStack } from 'native-base'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
import CourtCard from '@/components/court/CourtCard'
import { formatToVND } from '@/utils/utils'
import { useEffect, useMemo, useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useGetPayOsInfo } from '@/api/payment'
import { useNavigation } from 'expo-router'
import * as Linking from 'expo-linking'
const CheckoutPage = () => {
  const navigate = useNavigation()
  const { bookingData } = useCheckoutStore()
  const [paymentType, setPaymentType] = useState('full')
  console.log('bookingData', bookingData)
  const totalAmount = useMemo(() => {
    if (bookingData?.booking)
      return paymentType === 'full' ? bookingData.booking.totalPrice : bookingData.booking.totalPrice / 2
    return undefined
  }, [paymentType])
  const { mutateAsync } = useGetPayOsInfo({
    courtId: bookingData.booking?.court._id ?? '',
    totalAmount: totalAmount,
    onSuccessCB: (data) => {
      Linking.canOpenURL(data.url).then((supported) => {
        if (supported) {
          Linking.openURL(data.url)
        } else {
          console.log("Don't know how to open URI: " + data.url)
        }
      })
    }
  })

  return (
    <>
      <View className={'flex-1 p-4 mt-10'}>
        <Text className='text-2xl font-bold  text-center'>Confirm Booking</Text>
        <Text className='text-xl text-center text-slate-500 mb-6'>Review your pickleball court booking details.</Text>

        <HStack space={2} justifyContent={'space-between'}>
          <HStack className='mb-4' alignItems={'center'} space={2}>
            <FontAwesome5 name='calendar' size={18} color='green' />
            <Text className='text-lg font-semibold'>Date:</Text>
            <Text>{bookingData.booking?.startDate}</Text>
          </HStack>
          {/* <HStack className='mb-4' alignItems={'center'} space={2}>
            <Text className='text-lg font-semibold '>End Date:</Text>
            <Text>{bookingData.booking?.endDate}</Text>
          </HStack> */}
          <HStack className='mb-4' alignItems={'center'} space={2}>
            <FontAwesome6 name='clock-four' size={18} color='green' />
            <Text className='text-lg font-semibold '>Time:</Text>
            <Text>
              {bookingData.schedule?.startTime} - {bookingData.schedule?.endTime}
            </Text>
            <Text>{bookingData?.booking?.totalHour}hr</Text>
          </HStack>
        </HStack>

        <VStack>
          <Text className='text-lg font-semibold '>Court</Text>
          <View>
            <CourtCard court={bookingData.booking?.court} />
          </View>
        </VStack>
        <VStack space={3} justifyContent={'space-between'}>
          <HStack alignItems={'center'} justifyContent={'space-between'} space={2}>
            <Text className='text-lg font-semibold'>Total Price:</Text>
            <Text>{formatToVND(bookingData?.booking?.totalPrice)}</Text>
          </HStack>
          <HStack alignItems={'center'} justifyContent={'space-between'} space={2}>
            <Text className='text-lg font-semibold '>Amount:</Text>
            <Text>
              {paymentType === 'full'
                ? formatToVND(bookingData?.booking?.totalPrice)
                : formatToVND(bookingData?.booking?.totalPrice / 2)}
            </Text>
          </HStack>
          {/* <HStack className='mb-4' alignItems={'center'} space={2}>
            <Text className='text-lg font-semibold '>Total Hours:</Text>
            <Text>{bookingData?.booking?.totalHour}</Text>
          </HStack> */}
        </VStack>

        <HStack className='border-t my-4' alignItems={'center'} justifyContent={'space-between'} space={2}>
          <Text className='text-lg font-semibold '>Payment Type:</Text>

          <Select
            selectedValue={paymentType}
            minWidth='100'
            accessibilityLabel='Choose Payment Type'
            placeholder='Choose Payment Type'
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size='5' />
            }}
            mt={1}
            onValueChange={(itemValue) => setPaymentType(itemValue)}
          >
            <Select.Item label='Partial' value='partial' />
            <Select.Item label='Full' value='full' />
          </Select>
        </HStack>

        <View className=''>
          {/* {isGettingPayInfor ? (
            <ActivityIndicator size='large' />
          ) : PayOSInfor?.data ? (
            <PayOs
              url={PayOSInfor?.data?.url}
              orderCode={PayOSInfor?.data?.orderCode}
              successTriggerFn={() => {
                // setTriggerValue(true)
              }}
            />
          ) : (
            <Text className='text-center'>Can't get payment information</Text>
          )} */}
        </View>

        <Button
          className='my-3'
          variant={'solid'}
          colorScheme={'green'}
          onPress={async () => {
            await mutateAsync()
          }}
        >
          Confirm
        </Button>
        <Button
          variant={'outline'}
          colorScheme={'danger'}
          onPress={() => {
            navigate.navigate('(tabs)')
          }}
        >
          Cancel
        </Button>
      </View>
    </>
  )
}

export default CheckoutPage
