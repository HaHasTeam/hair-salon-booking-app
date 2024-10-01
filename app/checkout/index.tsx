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
import { useRoute } from '@react-navigation/native'
import { usePostBooking } from '@/api/booking'
import { Alert } from 'react-native'
const CheckoutPage = () => {
  const navigate = useNavigation()
  const { bookingData } = useCheckoutStore()
  const [paymentType, setPaymentType] = useState('full')
  const url = Linking.createURL('checkout')
  const route = useRoute()
  const url2 = Linking.useURL()

  const totalAmount = useMemo(() => {
    if (bookingData?.booking)
      return paymentType === 'full' ? bookingData.booking.totalPrice : bookingData.booking.totalPrice / 2
    return undefined
  }, [paymentType])
  const { mutateAsync: bookingMutation } = usePostBooking({
    onSuccessCB: (data) => {
      console.log('post booking success', data)
      if (data) {
        navigate.navigate('checkout')
      }
    }
  })
  const { mutateAsync } = useGetPayOsInfo({
    courtId: bookingData.booking?.court._id ?? '',
    totalAmount: totalAmount,
    returnUrl: url,
    onSuccessCB: (data) => {
      Linking.canOpenURL(data.url).then((supported) => {
        if (supported) {
          Linking.openURL(data.url)
        } else {
          console.log("Don't know how to openew URI: " + data.url)
        }
      })
    }
  })
  const handleBooking = async () => {
    if (bookingData?.booking?.type === 'single_schedule' && bookingData.schedule) {
      console.log({
        booking: {
          type: bookingData?.booking.type,
          paymentType,
          payment: 'tranfer',
          totalPrice: bookingData.booking.totalPrice,
          totalHour: bookingData.booking.totalHour,
          startDate: bookingData.booking.startDate,
          endDate: bookingData.booking.endDate,
          court: bookingData.booking.court._id
        },
        schedule: {
          type: bookingData.schedule.type,
          slots: bookingData.schedule.slots,
          startTime: bookingData.schedule?.startTime,
          endTime: bookingData.schedule?.endTime,
          date: bookingData.schedule?.date,
          court: bookingData.schedule.court._id
        },
        transaction: {
          amount: bookingData.booking.totalPrice,
          payment: '123123'
        }
      })

      await bookingMutation({
        booking: {
          type: bookingData.booking.type,
          paymentType,
          paymentMethod: 'tranfer',
          totalPrice: bookingData.booking.totalPrice,
          totalHour: bookingData.booking.totalHour,
          startDate: bookingData.booking.startDate,
          endDate: bookingData.booking.endDate,
          court: bookingData.booking.court._id
        },
        schedule: {
          type: bookingData.schedule.type,
          slots: bookingData.schedule.slots,
          startTime: bookingData.schedule?.startTime,
          endTime: bookingData.schedule?.endTime,
          date: bookingData.schedule?.date,
          court: bookingData.schedule.court._id
        },

        transaction: {
          amount: paymentType === 'full' ? bookingData.booking.totalPrice : bookingData.booking.totalPrice / 2,
          payment: '123123'
        }
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (url2) {
          const { queryParams } = Linking.parse(url2)
          console.log('queryParams', queryParams)

          let orderCode = (route as any).params.orderCode
          let status = (route as any).params.status
          console.log('check order code: ', orderCode, status)
          if (!orderCode || !status) return

          if (status === 'PAID') {
            await handleBooking()
          } else if (status === 'CANCELLED') {
            Alert.alert('Cancelled', 'Transaction is cancelled')
          } else {
            Alert.alert('Error', 'Transaction is error')
          }
        }
      } catch (error: any) {
        console.log('error: ', error)
      }
    })()
  }, [])
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
