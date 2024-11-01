import { View, Text, StyleSheet, Alert } from 'react-native'
import * as Linking from 'expo-linking'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
import { useEffect, useLayoutEffect, useState } from 'react'
import { usePostBooking } from '@/api/booking'
import { useRoute } from '@react-navigation/native'
import { useNavigation, useRouter } from 'expo-router'
import { Button, Pressable } from 'native-base'

const Result = () => {
  const navigate = useNavigation()
  const [payment, setPayment] = useState<{ status: string; orderCode: number }>({
    status: '',
    orderCode: 0
  })
  const { bookingData } = useCheckoutStore()
  const router = useRouter()
  console.log('bookingData 4: ', bookingData)
  const route = useRoute()
  let orderCode2 = (route as any).params.orderCode
  let status2 = (route as any).params.status

  const orderDetails = {
    orderId: '123456',
    items: [
      { name: 'Product 1', quantity: 2, price: 29.99 },
      { name: 'Product 2', quantity: 1, price: 49.99 }
    ],
    totalAmount: 109.98,
    paymentMethod: 'Credit Card',
    orderStatus: 'Processing'
  }
  const { mutateAsync: bookingMutation } = usePostBooking({
    onSuccessCB: (data) => {
      console.log('post booking success', data)
      if (data) {
        navigate.navigate('checkout')
      }
    }
  })
  // if (url) {
  //   const { hostname, path, queryParams } = Linking.parse(url)

  //   console.log(`Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(queryParams)}`)
  // }

  const handleBooking = async () => {
    if (bookingData?.booking?.type === 'single_schedule' && bookingData.schedule) {
      console.log('result: ', {
        booking: {
          type: bookingData.booking.type,
          paymentType: bookingData.paymentType,
          paymentMethod: 'tranfer',
          totalPrice: bookingData.booking.totalPrice,
          totalHour: bookingData.booking.totalHour,
          startDate: bookingData.booking.startDate,
          endDate: bookingData.booking.endDate,
          court: bookingData.schedule.services.map((el) => el._id)
        },
        schedule: {
          type: bookingData.schedule.type,
          slots: bookingData.schedule.slots,
          startTime: bookingData.schedule?.startTime,
          endTime: bookingData.schedule?.endTime,
          date: bookingData.schedule?.date,
          court: bookingData.schedule.services.map((el) => el._id),
          stylist: bookingData.schedule.stylist
        },

        transaction: {
          amount:
            bookingData.paymentType === 'full' ? bookingData.booking.totalPrice : bookingData.booking.totalPrice / 2,
          payment: '123123'
        }
      })

      await bookingMutation({
        booking: {
          branch: bookingData.booking.branch._id,
          type: bookingData.booking.type,
          paymentType: bookingData.paymentType,
          paymentMethod: 'tranfer',
          totalPrice: bookingData.booking.totalPrice,
          totalHour: bookingData.booking.totalHour,
          startDate: bookingData.booking.startDate,
          endDate: bookingData.booking.endDate,
          court: bookingData.schedule.services.map((el) => el._id)
        },
        schedule: {
          type: bookingData.schedule.type,
          slots: bookingData.schedule.slots,
          startTime: bookingData.schedule?.startTime,
          endTime: bookingData.schedule?.endTime,
          date: bookingData.schedule?.date,
          court: bookingData.schedule.services.map((el) => el._id),
          stylist: bookingData.schedule.stylist
        },

        transaction: {
          amount:
            bookingData.paymentType === 'full' ? bookingData.booking.totalPrice : bookingData.booking.totalPrice / 2,
          payment: 'fsdafsadfasfd'
        }
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        let orderCode = (route as any).params.orderCode
        let status = (route as any).params.status
        console.log('check order code: ', orderCode, status)
        if (!orderCode || !status) return

        if (status === 'PAID') {
          const res = await handleBooking()
          console.log('Paid order code: ', orderCode)
          console.log('res', res)

          setPayment({ status: status, orderCode: orderCode })

          console.log('test')
        } else if (status === 'CANCELLED') {
          console.log('cancelled order code: ', orderCode)
          setPayment({ status: status, orderCode: orderCode })
        } else {
          console.log('Error order code: ', orderCode)
        }
      } catch (error: any) {
        console.log('error: ', error)
      }
    })()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment {status2 === 'PAID' ? 'Successful' : 'Failed'}</Text>
      <View style={styles.orderDetails}>
        <Text>Order ID: {orderCode2}</Text>
        <Text>
          {status2 === 'PAID'
            ? 'Please view your schedule to be on time'
            : 'The payment failed please email to\n  support@hairharmony.com'}
        </Text>

        <Button
          onPress={() => {
            router.dismiss()
            router.push('/(tabs)/receipt')
          }}
          marginTop={4}
        >
          Go Home
        </Button>

        {/* Render order items, total amount, payment method, and order status */}
      </View>
    </View>
  )
}

export default Result
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  orderDetails: {
    marginBottom: 20
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
})
