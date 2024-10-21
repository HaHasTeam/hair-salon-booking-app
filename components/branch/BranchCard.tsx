import { Image, Text } from 'native-base'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import { Link, useSegments } from 'expo-router'
import { Pressable } from 'react-native'
import { IBranch } from '@/types/Branch'
const ImagePlace = require('@/assets/images/placeholder.png')
const BranchCard = ({ branch }: { branch: IBranch }) => {
  const segments = useSegments()

  const images = (branch.images && branch.images[0]) ?? ImagePlace
  return (
    <>
      {branch && (
        <Link href={`/branch/${branch._id}`} asChild>
          <Pressable className='rounded-md overflow-hidden border border-slate-400 flex flex-col max-w-[300px] h-[200px]'>
            <Image src={images} className='w-full h-32 object-cover ' alt='image placeholder' />
            <Text className='w-fit text-lg p-2' numberOfLines={2}>
              {branch.name}
            </Text>
          </Pressable>
        </Link>
      )}
    </>
  )
}

export default BranchCard
