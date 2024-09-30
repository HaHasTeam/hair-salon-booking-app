import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue, interpolate, Extrapolation } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

const PAGE_WIDTH = Dimensions.get('window').width
const colors = ['#26292E', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1']

function CarouselNormal({
  data,
  renderCard
}: {
  data: any[]
  renderCard: ({ item, index }: { item: any; index: number }) => React.ReactElement
}) {
  const [isVertical, setIsVertical] = React.useState(false)
  const [autoPlay, setAutoPlay] = React.useState(true)
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true)
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true)

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH * 0.86,
        height: PAGE_WIDTH * 0.6
      } as const)
    : ({
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH * 0.6
      } as const)

  const ref = React.useRef<ICarouselInstance>(null)

  return (
    <View
      style={{
        alignItems: 'center'
      }}
    >
      <Carousel
        ref={ref}
        {...baseOptions}
        style={{
          width: PAGE_WIDTH
        }}
        loop
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={2000}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50
        }}
        data={data}
        renderItem={({ item, index }) => renderCard({ item, index })}
      />
    </View>
  )
}

export default CarouselNormal
