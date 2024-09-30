import { Stack } from 'expo-router'
import { Text, View } from 'native-base'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
const CheckoutPage = () => {
  const { bookingData } = useCheckoutStore()
  console.log('bookingData', bookingData)

  return (
    <>
      <View>
        <Text>Checkout page</Text>
      </View>
    </>
  )
}

export default CheckoutPage
