import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { log } from '@/utils/logger.util'
import { useLocalSearchParams } from 'expo-router'
import { Image } from 'native-base'

const BranchDetail = () => {
  const { id: branchId } = useLocalSearchParams<{ id: string }>()
  log.debug('branchId', branchId)
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} />}
    >
      <ThemedView>
        <ThemedText>Branch Detail: {branchId}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  )
}

export default BranchDetail
