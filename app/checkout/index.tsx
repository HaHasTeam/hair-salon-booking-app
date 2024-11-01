import { Alert, Button, CheckIcon, HStack, Select, Text, View, VStack } from 'native-base'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
import CourtCard from '@/components/court/CourtCard'
import { formatToVND } from '@/utils/utils'
import { useEffect, useMemo, useState } from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useGetPayOsInfo } from '@/api/payment'
import { useNavigation, useRouter } from 'expo-router'
import * as Linking from 'expo-linking'
import { useAuth } from '@/provider/AuthProvider'
import { ActivityIndicator } from 'react-native'
const CheckoutPage = () => {
  const navigate = useRouter()
  const { bookingData, setPaymentType, paymentType } = useCheckoutStore()
  const { profile } = useAuth()
  const url = Linking.createURL('ressult')

  const totalAmount = useMemo(() => {
    if (bookingData?.booking)
      return bookingData.paymentType === 'full' ? bookingData.booking.totalPrice : bookingData.booking.totalPrice / 2
    return undefined
  }, [bookingData.paymentType])

  const { mutateAsync, isPending } = useGetPayOsInfo({
    user: profile?.firstName || '0348485167',
    courtId: bookingData.booking?.court._id ?? '',
    totalAmount: totalAmount,
    returnUrl: url,
    onSuccessCB: (data) => {
      Linking.canOpenURL(data.url).then((supported) => {
        if (supported) {
          Linking.openURL(data.url)
        } else {
          Alert("Don't know how to openew URI: " + data.url)
        }
      })
    }
  })

  if (isPending) {
    return <ActivityIndicator />
  }
  return (
    <>
      <View className={'flex-1 p-4 mt-10 bg-white'}>
        <Text className='text-2xl font-bold  text-center'>Hóa đơn</Text>
        <Text className='text-xl text-center text-slate-500 mb-6'>Xem lại hóa đơn của bạn.</Text>

        <HStack space={2} justifyContent={'space-between'}>
          <HStack className='mb-4' alignItems={'center'} space={2}>
            <FontAwesome5 name='calendar' size={18} color='green' />
            <Text className='text-lg font-semibold'>Ngày:</Text>
            <Text>{bookingData.booking?.startDate}</Text>
          </HStack>
          {/* <HStack className='mb-4' alignItems={'center'} space={2}>
            <Text className='text-lg font-semibold '>End Date:</Text>
            <Text>{bookingData.booking?.endDate}</Text>
          </HStack> */}
          <HStack className='mb-4' alignItems={'center'} space={2}>
            <FontAwesome6 name='clock-four' size={18} color='green' />
            <Text className='text-lg font-semibold '>Thời gian:</Text>
            <Text>
              {bookingData.schedule?.startTime} - {bookingData.schedule?.endTime}
            </Text>
            <Text>{bookingData?.booking?.totalHour}hr</Text>
          </HStack>
        </HStack>

        <VStack>
          <Text className='text-lg font-semibold '>Dịch vụ: </Text>
          <VStack space={4}>
            {bookingData?.schedule?.services?.map((el) => {
              return <CourtCard court={el} key={el._id} />
            })}
          </VStack>
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
            selectedValue={bookingData.paymentType}
            minWidth='100'
            accessibilityLabel='Choose Payment Type'
            placeholder='Choose Payment Type'
            _selectedItem={{
              bg: 'green.600',
              endIcon: <CheckIcon size='5' />
            }}
            mt={1}
            onValueChange={(itemValue) => {
              console.log('setPaymentType', itemValue)

              setPaymentType(itemValue)
            }}
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
            navigate.dismissAll()
          }}
        >
          Cancel
        </Button>
      </View>
    </>
  )
}

export default CheckoutPage
