import { Image, StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import Parallax from '@/components/CarouselCustom'
import BranchCard from '@/components/branch/BranchCard'
import { useBranchList } from '@/api/branchs'
import { ThemedText } from '@/components/ThemedText'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { View } from 'native-base'
// import { Calendar } from 'react-native-big-calendar'
// import { Link } from 'expo-router'
// const events = [
//   {
//     title: 'Meeting',
//     start: new Date(2020, 1, 11, 10, 0),
//     end: new Date(2020, 1, 11, 10, 30)
//   },
//   {
//     title: 'Coffee break',
//     start: new Date(2020, 1, 11, 15, 45),
//     end: new Date(2020, 1, 11, 16, 30)
//   }
// ]
const list = [
  {
    id: '1',
    title: 'First Item',
    color: '#26292E',
    img: require('@/assets/images/mock2.png')
  },
  {
    id: '2',
    title: 'Second Item',
    color: '#899F9C',
    img: require('@/assets/images/p7.jpg')
  },
  {
    id: '3',
    title: 'Third Item',
    color: '#B3C680',
    img: require('@/assets/images/p3.jpg')
  },
  {
    id: '4',
    title: 'Fourth Item',
    color: '#5C6265',
    img: require('@/assets/images/p4.jpg')
  },
  {
    id: '5',
    title: 'Fifth Item',
    color: '#F5D399',
    img: require('@/assets/images/p5.jpg')
  }
]
export default function HomeScreen() {
  const { data } = useBranchList()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/mock2.png')} className='w-full h-full object-cover' />}
    >
      <ThemedView style={styles.titleContainer}>
        <Parallax
          autoPlayInterval={2000}
          data={list}
          renderCard={({ item }) => {
            return (
              <ThemedView>
                <Image style={styles.img} source={item.img} />
              </ThemedView>
            )
          }}
        />
      </ThemedView>
      <ThemedView>
        <View display={'flex'} alignItems={'center'} alignContent={'center'} flexDirection={'row'}>
          <ThemedText className='text-green-600 '>Sân nổi bật</ThemedText>
          <TabBarIcon name='arrow-forward-circle-outline' className='text-green-600 ' />
        </View>
        <Parallax
          autoPlayInterval={2500}
          data={data}
          renderCard={({ item }) => {
            console.log('item.images[0]', item.images[0])

            return <BranchCard branch={item} />
          }}
        />
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },

  img: {
    height: '100%',
    width: '100%'
  }
})
