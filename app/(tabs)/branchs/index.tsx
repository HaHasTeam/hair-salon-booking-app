import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Link, useSegments } from 'expo-router'
import { Image, StyleSheet } from 'react-native'

const BranchScreen = () => {
  const segments = useSegments()
  console.log('segments', segments)
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} alt='placeholder' />}
    >
      <ThemedView>
        <ThemedText className='text-black'>List Branch screen</ThemedText>
        <Link href={`${segments[0 + 1]}/1`}>Navigate to branch id 1</Link>
      </ThemedView>
    </ParallaxScrollView>
  )
}

export default BranchScreen
