import { ICourt } from '@/types/Court'
import { Badge, HStack, Text } from 'native-base'
import { View, StyleSheet, Pressable } from 'react-native'
import BadgeCustom from '../BadgeCustom'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { formatToVND } from '@/utils/utils'
import { TabBarIcon } from '../navigation/TabBarIcon'

const CourtCard = ({
  court,
  onPressCard,
  isSelected = false
}: {
  court: ICourt
  onPressCard?: () => void
  isSelected?: boolean
}) => {
  return (
    <Pressable
      style={isSelected ? styles.containerSelected : styles.container}
      className='border '
      onPress={() => {
        onPressCard?.()
      }}
    >
      <View>
        <HStack space={1} justifyContent='start' alignItems={'center'}>
          <TabBarIcon name='cut' size={24} color={'#2d2d2d'} />
          <Text style={styles.title}> {court.name}</Text>
        </HStack>
        <Text style={styles.time} numberOfLines={2}>
          {court.description}
        </Text>
        <HStack space={3} justifyContent='space-between' className='my-1'>
          <BadgeCustom status={court.status} />
          <View>
            <Text>Type: {court.type}</Text>
          </View>
        </HStack>
        <View>
          <Text className='text-lg text-slate-500 font-light'>{formatToVND(court.price)}/hr</Text>
        </View>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerSelected: {
    backgroundColor: '#bfc8d1',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5
  },
  time: {
    color: 'gray'
  },
  status: {
    fontWeight: '500'
  }
})

export default CourtCard
