import { Image, Text } from 'native-base'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import { Link, useSegments } from 'expo-router'
import { Pressable } from 'react-native'
const ImagePlace = require('@/assets/images/placeholder.png')
const BranchCard = () => {
  const segments = useSegments()
  console.log('segments', segments)

  return (
    <Link href={`/${segments[0]}/orders/1`} asChild>
      <Pressable className='rounded-md overflow-hidden border border-slate-400 flex flex-col max-w-[200px]'>
        <ThemedView>
          <Image source={ImagePlace} className='w-full h-32 object-cover rounded-md' alt='image placeholder' />
          <Text className='w-fit text-lg'>Sân cầu lông Cây Lộc Vừng - TP. Thủ Đức</Text>
        </ThemedView>
      </Pressable>
    </Link>
  )
}

export default BranchCard
