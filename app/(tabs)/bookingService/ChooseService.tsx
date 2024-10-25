import { useBranchList } from '@/api/branchs'
import BranchListItem from '@/components/branch/BranchListItem'
import CourtCard from '@/components/court/CourtCard'
import CustomFlatList from '@/components/CustomFlatList'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import SearchBar from '@/components/SearchBar'
import { IBranch } from '@/types/Branch'
import { useSegments } from 'expo-router'
import { Center, Text, View } from 'native-base'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useGetCourtQuery } from '../../../api/courts/index'
import { ICourt } from '@/types/Court'

const ChooseService = () => {
  const [searchPhrase, setSearchPhrase] = useState('')

  const ImagePlace = require('@/assets/images/placeholder.png')
  const { mutateAsync: getCourtQuery, isPending, data } = useGetCourtQuery()
  console.log('data', data)

  const onSubmitSearch = async (search: string) => {
    const searchKey = search.trim().toLocaleLowerCase()
    console.log('onSubmitSearch', searchKey)
  }
  useEffect(() => {
    getCourtQuery({
      branch: '6716907cc3514a38667e6235'
      //   name: ''
    })
  }, [])
  // 6716907cc3514a38667e6235
  const renderItem = ({ item }: { item: ICourt }) => {
    const images = (item.images && item.images[0]) ?? ImagePlace

    return (
      <View padding={2}>
        <CourtCard court={item} key={item._id} />
      </View>
    )
  }
  if (isPending) {
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
      ListEmptyComponent={
        <Center flex={1} mt={5}>
          <Text fontSize='lg' color='gray.500'>
            No items to display
          </Text>
        </Center>
      }
      // TopListElementComponent={<CarouselCards setSelectedBrand={setSelectedBrand} />}
    />
  )
}

export default ChooseService
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
