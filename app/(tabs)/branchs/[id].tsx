import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { log } from '@/utils/logger.util'
import { useLocalSearchParams } from 'expo-router'
import { Image } from 'native-base'
import { useBranchDetail } from '@/api/branchs'
import { ActivityIndicator } from 'react-native'
const BranchDetail = () => {
  const { id: branchId } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading } = useBranchDetail({ id: branchId })
  log.debug('branchId', data)
  if (isLoading) {
    return <ActivityIndicator size='large' />
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image alt='test Image' source={require('@/assets/images/partial-react-logo.png')} />}
    >
      <ThemedView>
        <ThemedText>Branch Detail: {data?.name}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  )
}

export default BranchDetail
