import { View, Text, StyleSheet, Button } from 'react-native'
import * as Linking from 'expo-linking'

const Result = () => {
  const url = Linking.createURL('ressult')
  console.log('url', url)
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
  // if (url) {
  //   const { hostname, path, queryParams } = Linking.parse(url)

  //   console.log(`Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(queryParams)}`)
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Successful!</Text>
      <View style={styles.orderDetails}>
        <Text>Order ID: {orderDetails.orderId}</Text>
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
