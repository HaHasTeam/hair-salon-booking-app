import { useBookingDetail } from '@/api/booking'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'native-base'
import { ActivityIndicator, Image, Text, View, StyleSheet } from 'react-native'

const ReceiptDetail = () => {
  const { id: bookingId } = useLocalSearchParams<{ id: string }>()
  console.log('bookingId ', bookingId)
  const { data: order, isLoading } = useBookingDetail({ id: bookingId })

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }

  //     return (
  //    <View style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
  //       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Details</Text>
  //       <View style={{ marginTop: 10 }}>
  //         <Text style={{ fontWeight: 'bold' }}>Customer Information</Text>
  //         <Text>Username: {order.booking.customer.username}</Text>
  //         <Text>Email: {order.booking.customer.email}</Text>
  //       </View>
  //       <View style={{ marginTop: 10 }}>
  //         <Text style={{ fontWeight: 'bold' }}>Appointment Details</Text>
  //         <Text>Start Time: {order.startTime}</Text>
  //         <Text>End Time: {order.endTime}</Text>
  //         <Text>Date: {new Date(order.date).toLocaleDateString()}</Text>
  //         <Text>Status: {order.status}</Text>
  //         <Text>Type: {order.booking.type}</Text>
  //         <Text>Service Names:</Text>
  //         <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  //           {order.court.map((service) => (
  //             <Text key={service.name} style={{ marginRight: 10, backgroundColor: '#eee', padding: 5 }}>
  //               {service.name}
  //             </Text>
  //           ))}
  //         </View>
  //       </View>
  //       <View style={{ marginTop: 10 }}>
  //         <Text style={{ fontWeight: 'bold' }}>Branch Information</Text>
  //         <Text>Branch: {order.court[0].branch.name}</Text>
  //         <Text>Address: {order.court[0].branch.address}</Text>
  //       </View>
  //       {order.booking.imageQR && (
  //         <View style={{ marginTop: 10 }}>
  //           <Text style={{ fontWeight: 'bold' }}>QR Code</Text>
  //           <Image source={{ uri: order.booking.imageQR }} style={{ width: 100, height: 100 }} />
  //         </View>
  //       )}
  //     </View>
  //     );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Order Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Customer Information</Text>
          <Text style={styles.infoText}>Username: {order?.booking?.customer?.username}</Text>
          <Text style={styles.infoText}>Email: {order?.booking?.customer?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Appointment Details</Text>
          <Text style={styles.infoText}>Date: {new Date(order.date).toLocaleDateString()}</Text>
          <View style={styles.row}>
            <Text style={styles.infoText}>Start Time: {order?.startTime}</Text>
            <Text style={styles.infoText}>End Time: {order?.endTime}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.highlightText}>Status: {order?.status}</Text>
            <Text style={styles.highlightText}>Type: {order?.booking?.type}</Text>
          </View>

          <Text style={styles.subHeader}>Service Names:</Text>
          <View style={styles.servicesContainer}>
            {order?.court.map((service) => (
              <Text key={service?.name} style={styles.serviceItem}>
                {service?.name}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Branch Information</Text>
          <Text style={styles.highlightText}>{order?.court[0]?.branch?.name}</Text>
          <Text style={styles.infoText}>Address: {order?.court[0]?.branch?.address}</Text>
        </View>

        {order.booking.imageQR && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>QR Code</Text>
            <Image source={{ uri: order?.booking?.imageQR }} style={styles.qrImage} />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    width: '100%'
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555'
  },
  highlightText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ff6347',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333'
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  serviceItem: {
    marginRight: 10,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007BFF',
    marginBottom: 5
  },
  qrImage: {
    width: 250,
    height: 250,
    marginTop: 10,
    alignSelf: 'center'
  }
})

export default ReceiptDetail
