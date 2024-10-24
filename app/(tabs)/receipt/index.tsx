import CustomFlatList from "@/components/CustomFlatList";
import { StyleSheet, Text, View } from "react-native";
import { useMyBookingList } from "@/api/booking";
import ReceiptCard from "@/components/ReceiptCard";
import { useRouter } from "expo-router";

const ReceiptList = () => {
    const {data} = useMyBookingList()
    const router = useRouter();
    function onReceiptCard(id){
      router.push(`/(tabs)/receipt/${id}`)
    }

      const renderItem = ({ item }) => {
    return (
     <View><ReceiptCard item={item} onPressReceiptCard={onReceiptCard}/></View>
    )
  }
    return ( 
        <View>
            <Text>Receipt</Text>
              <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={renderItem}
                StickyElementComponent={
                    <View style={styles.sticky}></View>
                }
    />
        </View>
     );
}
 const styles = StyleSheet.create({
  list: {
    overflow: 'hidden'
  },
  sticky: {
    backgroundColor: 'white',
    height: 65,
    width: '100%'
  },
 })
export default ReceiptList;