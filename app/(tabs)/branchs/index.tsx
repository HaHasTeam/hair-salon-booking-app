import { useBranchList } from '@/api/branchs'
import BranchListItem from '@/components/branch/BranchListItem'
import CustomFlatList from '@/components/CustomFlatList'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import SearchBar from '@/components/SearchBar'
import { IBranch } from '@/types/Branch'
import { Link, useSegments } from 'expo-router'
import { View } from 'native-base'
import { useMemo, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet } from 'react-native'

const BranchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const { data, isLoading } = useBranchList()
  // const [search, setSearch] = useState('')
  const searchData = useMemo(() => {
    let result = [...data]
    if (searchPhrase) {
      result = result.filter((item) => {
        if (
          item.name.toUpperCase().includes(searchPhrase.toUpperCase()) ||
          item.address.toUpperCase().includes(searchPhrase.toUpperCase())
        ) {
          console.log('item received', item)
          return true
        } else false
      })
    }
    return result
  }, [searchPhrase])
  console.log('searchData', searchData)

  const onSubmitSearch = async (search: string) => {
    const searchKey = search.trim().toLocaleLowerCase()
    console.log('onSubmitSearch', searchKey)
  }
  console.log('data', data)

  const renderItem = ({ item }: { item: IBranch }) => {
    return (
      <BranchListItem
        item={item}
        onPressBooking={() => console.log('Minh')}
        onPressBranchCard={() => {
          console.log('minh2')
        }}
      />
    )
  }
  if (isLoading) {
    return <ActivityIndicator size='large' />
  }
  return (
    <CustomFlatList
      data={searchData}
      style={styles.list}
      renderItem={renderItem}
      StickyElementComponent={
        <View style={styles.sticky}>
          <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
        </View>
      }
      // TopListElementComponent={<CarouselCards setSelectedBrand={setSelectedBrand} />}
    />
  )
}

export default BranchScreen
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
  /** Card */
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
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
    color: '#444'
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
    fontSize: 14,
    fontWeight: '500',
    color: '#909090'
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
  }
})
