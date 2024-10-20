import { View, Text } from 'react-native'
import React from 'react'
import Rating from './Rating'
import { Avatar } from 'native-base'
import ImgDisplay from './ImgDisplay'
type FeedBackItemProps = {
  name?: string
  star?: number
  feedback?: string
  images?: string[]
}
const FeedBackItem = ({
  name = 'Truong Nhat Quang',
  star = 4.5,
  feedback = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis sed odio lacinia tincidunt. Nullam',
  images = undefined
}: FeedBackItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,

        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          width: '100%'
        }}
      >
        <Avatar
          bg='indigo.500'
          source={{
            uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }}
        >
          JB
        </Avatar>

        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
          <Rating star={star} />
        </View>
        <View
          style={{
            marginLeft: 'auto'
          }}
        >
          <ImgDisplay images={images} />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 16 }}>{feedback}</Text>
      </View>
    </View>
  )
}

export default FeedBackItem
