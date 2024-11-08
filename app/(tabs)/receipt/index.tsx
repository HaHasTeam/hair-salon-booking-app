import CustomFlatList from '@/components/CustomFlatList'
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useMyBookingList } from '@/api/booking'
import ReceiptCard from '@/components/ReceiptCard'
import { useFocusEffect, useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'native-base'

const ReceiptList = () => {
  const { data, refetch, isLoading } = useMyBookingList()
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState('All')

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }
  const getFilteredData = () => {
    if (filterStatus === 'All') {
      return data
    }
    return data.filter((item) => item.status === filterStatus.toLowerCase())
  }
  console.log(data)

  const onFilterChange = (status) => {
    setFilterStatus(status)
  }

  function onReceiptCard(id) {
    router.push(`/(tabs)/receipt/${id}`)
  }

  const renderItem = ({ item }) => {
    return <ReceiptCard item={item} onPressReceiptCard={onReceiptCard} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['All', 'Pending', 'Booked', 'Cancelled', 'Done'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filterStatus === status && styles.activeFilterButton]}
            onPress={() => onFilterChange(status)}
          >
            <Text style={[styles.filterButtonText, filterStatus === status && styles.activeFilterText]}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          maxHeight: '70%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CustomFlatList
          data={getFilteredData()}
          style={styles.list}
          renderItem={renderItem}
          StickyElementComponent={null}
          ListEmptyComponent={
            <View>
              <Text>Empty order</Text>
            </View>
          }
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
    // padding: 10
  },
  list: {
    overflow: 'hidden'
  },
  sticky: {
    backgroundColor: 'white',
    height: 65,
    width: '100%'
  },
  filterContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5
  },
  filterButtonText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500'
  },
  activeFilterButton: {
    backgroundColor: 'blue',
    borderColor: 'blue'
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
export default ReceiptList
