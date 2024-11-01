import { View, Text, ScrollView, Image, FlatList, StyleSheet, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useBookingDetailById, useDoneBooking } from '@/api/booking'
import { Ionicons } from '@expo/vector-icons'
const Checking = () => {
  const route = useRoute()
  const { data } = route.params || {}
  const info = data.split('/')
  const id = info[info.length - 1]
  const { mutateAsync: mutateDoneBooking } = useDoneBooking()
  const { data: booking, refetch } = useBookingDetailById(id)

  const renderCourtItem = ({ item }) => (
    <View style={styles.courtContainer}>
      <Text style={styles.courtName}>{item.name}</Text>
      <Text style={styles.courtPrice}>{`Price: ${item.price} VND`}</Text>
      <Text style={styles.courtStatus}>{`Status: ${item.status}`}</Text>
    </View>
  )
  const handleDoneBooking = async () => {
    try {
      await mutateDoneBooking(booking?.booking._id)
      Alert.alert('Success', 'Your booking has been completed successfully!')
      await refetch()
    } catch (error) {
      console.log(error)

      Alert.alert('Error', 'There was an issue completing your booking. Please try again.')
    }
  }

  return (
    booking?.booking && (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Booking Details</Text>
        </View>
        <View style={styles.bookingInfo}>
          <View style={styles.infoRow}>
            <Ionicons name='ticket' size={20} color='#007bff' />
            <Text style={styles.infoText}>
              Type: <Text style={styles.highlight}>{booking?.booking.type}</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='card' size={20} color='#007bff' />
            <Text style={styles.infoText}>
              Payment Method: <Text style={styles.highlight}>{booking?.booking.paymentMethod}</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='cash' size={20} color='#007bff' />
            <Text style={styles.infoText}>
              Total Price: <Text style={styles.highlight}>{booking?.booking.totalPrice} VND</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='checkmark-circle' size={20} color='#007bff' />
            <Text style={styles.infoText}>
              Status: <Text style={styles.highlight}>{booking?.booking.status}</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='calendar' size={20} color='#007bff' />
            <Text style={styles.infoText}>
              Start Date:{' '}
              <Text style={styles.highlight}>{new Date(booking?.booking.startDate).toLocaleDateString()}</Text>
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='calendar' size={20} color='#007bff' />
            <Text style={styles.infoText}>
              End Date: <Text style={styles.highlight}>{new Date(booking?.booking.endDate).toLocaleDateString()}</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Services</Text>
        <FlatList
          data={booking?.booking.court}
          renderItem={renderCourtItem}
          keyExtractor={(court) => court._id}
          style={styles.list}
        />
        {booking?.booking.status === 'Done' ? (
          <View
            style={{
              padding: 10,
              backgroundColor: '#d4edda',
              borderRadius: 10,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                color: 'green',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold'
              }}
            >
              Booking has been completed
            </Text>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title='Done Booking'
              onPress={handleDoneBooking}
              color='#007bff'
              disabled={booking?.booking.status === 'Done'}
            />
          </View>
        )}
      </ScrollView>
    )
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20, // Space above the button
    marginBottom: 20, // Space below the button
    alignItems: 'center' // Center the button horizontally
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9'
  },
  header: {
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  bookingInfo: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2 // Shadow effect
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333'
  },
  list: {
    marginBottom: 16
  },
  courtContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 1 // Shadow effect
  },
  courtName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff'
  },
  courtDescription: {
    fontSize: 14,
    marginVertical: 4,
    color: '#555'
  },
  courtPrice: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold'
  },
  courtStatus: {
    fontSize: 14,
    color: '#dc3545' // Red color for 'Inuse' or any other status
  }
})

export default Checking
