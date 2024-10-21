import React, { useState } from 'react'
import { Image, ImageStyle, StyleProp, Text, TouchableOpacity, View } from 'react-native'
import EnhancedImageViewing from 'react-native-image-viewing'
type Props = {
  images?: string[]
  imgStyle?: StyleProp<ImageStyle>
  maxPreview?: number
}
const defaultImages = [
  'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
  'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
  'https://images.unsplash.com/photo-1569569970363-df7b6160d111'
]

const ImgDisplay = ({ images = defaultImages, imgStyle, maxPreview = 2 }: Props) => {
  const [visible, setIsVisible] = useState(false)
  const imagesParsed = images.map((image) => ({ uri: image }))

  return !images?.length ? null : (
    <>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          {images.slice(0, maxPreview).map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={[{ width: 50, height: 50, borderRadius: 10, borderWidth: 2, borderColor: 'gray' }, imgStyle]}
            />
          ))}
          {images.length > maxPreview && (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: 'black',
                padding: 5,
                borderRadius: 10
              }}
            >
              +{images.length - maxPreview}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <EnhancedImageViewing
        images={imagesParsed}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  )
}

export default ImgDisplay
