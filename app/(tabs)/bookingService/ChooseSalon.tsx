import { useBranchList } from '@/api/branchs'
import BranchListItem from '@/components/branch/BranchListItem'
import CustomFlatList from '@/components/CustomFlatList'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import SearchBar from '@/components/SearchBar'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
import { IBranch } from '@/types/Branch'
import { useRouter, useSegments } from 'expo-router'
import { Text, View } from 'native-base'
import { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native'

const ChooseSalon = () => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const ImagePlace = require('@/assets/images/placeholder.png')
  const { data, isLoading } = useBranchList()
  const { setSelectedBranch } = useCheckoutStore()
  const router = useRouter()
  const onSubmitSearch = async (search: string) => {
    const searchKey = search.trim().toLocaleLowerCase()
    console.log('onSubmitSearch', searchKey)
  }

  const renderItem = ({ item }: { item: IBranch }) => {
    const images = (item.images && item.images[0]) ?? ImagePlace
    return (
      <TouchableOpacity
        key={item._id}
        style={styles.card}
        onPress={() => {
          console.log('salon selected:', item.name)

          setSelectedBranch(item)
          router.back()
        }}
      >
        <View>
          <View style={styles.cardTop}>
            <Image alt={item.name} resizeMode='cover' style={styles.cardImg} src={images} />
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>

            <View style={styles.cardStats}>
              <View style={styles.cardStatsItem}>
                <TabBarIcon name='location' size={14} color={'#2d2d2d'} />
                <Text style={styles.cardStatsItemText} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.centerItem}>
                <TabBarIcon name='time-outline' size={14} color={'#000'} />
                <Text style={styles.cardFooterText}>{item.availableTime}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end'
                }}
              >
                <Text
                  style={{
                    marginHorizontal: 5,
                    verticalAlign: 'bottom',
                    marginTop: 'auto'
                  }}
                >
                  schedule
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  if (isLoading) {
    return <ActivityIndicator size='large' />
  }
  return (
    <CustomFlatList
      data={data}
      style={styles.list}
      renderItem={renderItem}
      StickyElementComponent={
        <View style={styles.sticky}>
          <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} onSubmitSearch={onSubmitSearch} />
        </View>
      }
      // TopListElementComponent={<CarouselCards setSelectedBrand={setSelectedBrand} />}
    />
  )
}

export default ChooseSalon
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60
  },
  item: {
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: '100%'
  },
  list: {
    overflow: 'hidden'
  },
  sticky: {
    backgroundColor: 'white',
    height: 65,
    width: '100%'
  },
  topList: {
    borderWidth: 5,
    height: 100,
    marginBottom: 10,
    width: '100%'
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
    marginLeft: 10,
    marginTop: 10
  },

  /** Action */
  action: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: '#e8f0f9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 8
  },
  card: {
    width: '88%',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  favoriteIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    top: 5,
    end: 5,
    backgroundColor: '#ffffff'
  },
  cardImg: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12

    // marginVertical: 20
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2d2d2d',
    width: '80%'
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: 'tomato'
  },
  centerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -12
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardFooterText: {
    alignItems: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#909090'
  }
})
