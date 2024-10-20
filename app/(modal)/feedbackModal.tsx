import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base'
import FeedBackItem from '@/components/FeedBackItem'

const feedbackmodal = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',

        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flex: 1
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8
        }}
      >
        <View
          style={{
            padding: 10,

            flexDirection: 'row',
            gap: 8
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold'
            }}
          >
            Đánh giá từ khách hàng
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <FlatList
          style={{
            paddingRight: 10
          }}
          data={new Array(10).fill(0)}
          renderItem={() => <FeedBackItem />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </View>
  )
}

export default feedbackmodal
