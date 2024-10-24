import CustomFlatList from "@/components/CustomFlatList";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMyBookingList } from "@/api/booking";
import ReceiptCard from "@/components/ReceiptCard";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "native-base";

const ReceiptList = () => {
    const {data} = useMyBookingList()
    const router = useRouter();
    const [filterStatus, setFilterStatus] = useState('All');

    const getFilteredData = () => {
        if (filterStatus === 'All') {
            return data;
        }
        return data.filter(item => item.status === filterStatus.toLowerCase());
    }

    const onFilterChange = (status) => {
        setFilterStatus(status);
    }


    function onReceiptCard(id){
      router.push(`/(tabs)/receipt/${id}`)
    }

      const renderItem = ({ item }) => {
    return (
     <View><ReceiptCard item={item} onPressReceiptCard={onReceiptCard}/></View>
    )
  }
    return ( 
      <ScrollView>
      <View style={styles.container}>
             <View style={styles.filterContainer}>
            {['All', 'Pending', 'Booked', 'Cancelled', 'Done'].map((status) => (
                <TouchableOpacity
                    key={status}
                    style={[
                        styles.filterButton,
                        filterStatus === status && styles.activeFilterButton 
                    ]}
                    onPress={() => onFilterChange(status)}
                >
                    <Text
                        style={[
                            styles.filterButtonText,
                            filterStatus === status && styles.activeFilterText
                        ]}
                    >
                        {status}
                    </Text>
                </TouchableOpacity>
            ))}
            </View>
       
              <CustomFlatList
                data={getFilteredData()}
                style={styles.list}
                renderItem={renderItem}
                StickyElementComponent={
                    <View style={styles.sticky}></View>
                }
    />
        </View>
        </ScrollView>
     );
}
 const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 10,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingHorizontal: 10, 
    },
    filterButton: {
        paddingVertical: 9, 
        paddingHorizontal: 11,
        borderRadius: 20,
        backgroundColor: '#f0f0f0', 
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5, 
    },
    filterButtonText: {
        fontSize: 11,
        color: '#333',
        fontWeight: '500',
    },
    activeFilterButton: {
        backgroundColor: 'blue',
        borderColor: 'blue',
    },
    activeFilterText: {
        color: 'white',
        fontWeight: 'bold',
    }
 })
export default ReceiptList;