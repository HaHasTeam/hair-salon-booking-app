import { useBranchList } from '@/api/branchs'
import BranchListItem from '@/components/branch/BranchListItem'
import CourtCard from '@/components/court/CourtCard'
import CustomFlatList from '@/components/CustomFlatList'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import SearchBar from '@/components/SearchBar'
import { IBranch } from '@/types/Branch'
import { router, useSegments } from 'expo-router'
import { Button, Center, HStack, Text, View, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { useGetCourtQuery } from '../../../api/courts/index'
import { ICourt } from '@/types/Court'
import { useCheckoutStore } from '@/hooks/useCheckoutStore'
import { CourtStatusEnum } from '@/types'
import { calculateTotalServicePrice } from '@/utils/utils'

const ChooseService = () => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const { setSelectedService, bookingData } = useCheckoutStore()
  const ImagePlace = require('@/assets/images/placeholder.png')
  const { mutateAsync: getCourtQuery, isPending, data } = useGetCourtQuery()

  const onSubmitSearch = async (search: string) => {
    const searchKey = search.trim().toLocaleLowerCase()
    console.log('onSubmitSearch', searchKey)
  }
  useEffect(() => {
    getCourtQuery({
      branch: bookingData.selectedBrach?._id
      //   name: ''
    })
  }, [])

  const renderItem = ({ item }: { item: ICourt }) => {
    // console.log('bookingData?.service', bookingData?.service)

    const isSelected = bookingData?.service?.find((el) => el._id == item._id)
    return (
      <View padding={3} key={item._id}>
        <CourtCard
          court={item}
          key={item._id}
          isSelected={!!isSelected}
          onPressCard={() => {
            const existItem = bookingData?.service?.includes(item)
            if (existItem) {
              setSelectedService(bookingData.service?.filter((el) => el._id !== item._id))
            } else {
              setSelectedService([...bookingData.service, item])
              console.log('check service', bookingData?.service?.length)
            }
          }}
        />
      </View>
    )
  }

  // useEffect(() => {
  //   if (bookingData?.service?.length > 0 && data) {
  //     const listService = data
  //       ?.map((el2) => {
  //         const isSelected = bookingData?.service?.includes(el2)
  //         console.log('isSelected', isSelected)

  //         return { ...el2, isSelected: isSelected }
  //       })
  //       .filter((el) => el.status !== CourtStatusEnum.TERMINATION)
  //     setServices(listService)
  //   }
  // }, [])

  if (isPending) {
    return <ActivityIndicator size='large' />
  }

  return (
    <SafeAreaView className='flex-1'>
      <CustomFlatList
        data={data?.filter((el: ICourt) => el.status !== CourtStatusEnum.TERMINATION)}
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
        StickyBottomElement={
          <View position={'absolute'} left={0} right={0} bottom={0} background={'blue.200'} w={'full'} padding={5}>
            <HStack justifyContent={'space-between'} w={'full'}>
              <Button variant={'link'}>
                Đã chọn <Text display={'inline'}>{bookingData.service?.length}</Text>
                dịch vụ
              </Button>
              <HStack space={2} alignItems={'center'}>
                <VStack justifyContent={'flex-end'} alignItems={'flex-end'}>
                  <Text>Tổng Thanh toán</Text>
                  <Text>
                    {calculateTotalServicePrice(bookingData?.service)}/{bookingData.service?.length}h
                  </Text>
                </VStack>
                <Button
                  size={'sm'}
                  onPress={() => {
                    router.dismiss()
                  }}
                >
                  Xong
                </Button>
              </HStack>
            </HStack>
          </View>
        }
        // TopListElementComponent={<CarouselCards setSelectedBrand={setSelectedBrand} />}
      />
    </SafeAreaView>
  )
}

export default ChooseService
const styles = StyleSheet.create({
  billingContainer: {},
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
