import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Image, Text, View } from 'native-base'
import { useBranchDetail } from '@/api/branchs'
import { ActivityIndicator, Pressable } from 'react-native'
import CarouselNormal from '@/components/CarouselNormal'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { IBranch } from '@/types/Branch'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import CourtCard from '@/components/court/CourtCard'
import { ICourt } from '@/types/Court'
import FeedBackSection from '@/components/FeedBackSection'

const BranchDetail = () => {
  const { id: branchId } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading } = useBranchDetail({ id: branchId })

  if (isLoading) {
    return <ActivityIndicator size='large' />
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => {
            return (
              <Link href={'/(tabs)/branchs'}>
                <Text fontSize={'2xl'} fontWeight={'bold'} color={'green.400'} padding={2}>
                  Branch
                </Text>
              </Link>
            )
          },
          headerShadowVisible: false
        }}
      />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <CarouselNormal
            data={data?.images}
            renderCard={({ item }) => <Image src={item} alt='image' style={{ width: '100%', height: '100%' }} />}
          />
        }
      >
        <Text className='text-2xl font-bold' numberOfLines={2}>
          {data.name}
        </Text>

        <View flexDirection={'row'} alignItems={'center'}>
          <TabBarIcon name='time-outline' size={20} color={'#2d2d2d'} />
          <Text className='text-lg font-semibold uppercase text-slate-600 ml-2'>{data.availableTime}</Text>
        </View>

        <View flexDirection={'row'} alignItems={'center'}>
          <TabBarIcon name='location-outline' size={20} color={'#2d2d2d'} />
          <Text className='text-lg font-bold ml-2 '>{data.address}</Text>
        </View>
        <View flexDirection={'row'} alignItems={'center'}>
          <MaterialCommunityIcons name='soccer-field' size={24} color={'#2d2d2d'} />
          <Text className='text-lg font-bold ml-2 '>{data.courts.length} sân</Text>
        </View>
        <Text className='text-lg'>{data.description}</Text>

        {/* Footer */}
        <Pressable className='  flex-row items-center justify-between border-y-2 border-gray-300 p-5 '>
          <Link href={`/booking/${data._id}`} className='rounded-md bg-green-500 p-5 px-8 w-full text-center'>
            <Text className='text-lg font-bold text-white'>Đặt Sân ngay</Text>
          </Link>
        </Pressable>
        <View>
          <Text className='text-lg font-bold'>Our Courts</Text>
          {data.courts.map((item: ICourt) => {
            return <CourtCard court={item} key={item._id} />
          })}
        </View>
        <FeedBackSection branchId={branchId} />
      </ParallaxScrollView>
    </>
  )
}

export default BranchDetail
