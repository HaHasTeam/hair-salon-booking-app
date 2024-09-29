import React, { useState } from 'react'
import { View, Dimensions, StyleSheet, Image } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

const PAGE_WIDTH = Dimensions.get('window').width

const list = [
  {
    id: '1',
    title: 'First Item',
    color: '#26292E',
    img: require('@/assets/images/1.jpg')
  },
  {
    id: '2',
    title: 'Second Item',
    color: '#899F9C',
    img: require('@/assets/images/2.jpg')
  },
  {
    id: '3',
    title: 'Third Item',
    color: '#B3C680',
    img: require('@/assets/images/3.jpg')
  },
  {
    id: '4',
    title: 'Fourth Item',
    color: '#5C6265',
    img: require('@/assets/images/4.jpg')
  },
  {
    id: '5',
    title: 'Fifth Item',
    color: '#F5D399',
    img: require('@/assets/images/5.jpg')
  }
]

function Parallax({
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
  const progress = useSharedValue<number>(0)
  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH * 0.86,
        height: PAGE_WIDTH * 0.6
      } as const)
    : ({
        vertical: false,
        width: PAGE_WIDTH * 0.75,
        height: PAGE_WIDTH * 0.6
      } as const)

  const ref = React.useRef<ICarouselInstance>(null)

  return (
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
      autoPlayInterval={1500}
      mode='parallax'
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50
      }}
      data={data}
      renderItem={({ item, index }) => renderCard({ item, index })}
    />
  )
}

export default Parallax
