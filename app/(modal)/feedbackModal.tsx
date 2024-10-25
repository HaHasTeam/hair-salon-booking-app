import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base'
import FeedBackItem from '@/components/FeedBackItem'
import { useLocalSearchParams } from 'expo-router'
import { useGetFeedbackByBranchId } from '@/api/feedback'

const feedbackmodal = () => {
  const params = useLocalSearchParams()
  const data = useGetFeedbackByBranchId(params.branchId as string)

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
        {data.isLoading && <Text> Loading... </Text>}
        {!!!data?.data?.length ? (
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Chưa có đánh giá nào</Text>
        ) : (
          <FlatList
            data={data?.data}
            renderItem={({
              item
            }: {
              item: {
                feedback: string
                images: string[]
                star: number
                name: string
              }
            }) => (
              <FeedBackItem
                feedback={item.feedback}
                images={item.images}
                star={item.star}
                name={item.name || 'Người dùng'}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  )
}

export default feedbackmodal
