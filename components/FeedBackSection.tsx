import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import FeedBackItem from './FeedBackItem'
import { Link, useFocusEffect } from 'expo-router'
import { useGetFeedbackByBranchId } from '@/api/feedback'

const FeedBackSection = ({ branchId }: { branchId: string }) => {
  console.log(branchId, 'ASdfsd')

  const data = useGetFeedbackByBranchId(branchId)

  return (
    <Link href={'/(modal)/feedbackModal?branchId=' + branchId} asChild>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 2
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
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
              gap: 8
            }}
          >
            <Ionicons name='star' size={24} color='orange' />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đánh giá</Text>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: 'gray',
              marginTop: 10,
              paddingTop: 10,
              gap: 10
            }}
          >
            {!!!data?.data?.length ? (
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Chưa có đánh giá nào</Text>
            ) : (
              data?.data?.map((item, index) =>
                index <= 1 ? (
                  <FeedBackItem
                    key={index}
                    feedback={item.feedback}
                    images={item.images}
                    star={item.star}
                    name={item.name || 'Người dùng'}
                  />
                ) : undefined
              )
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 2
            }}
          >
            <Ionicons name='chevron-down' size={24} color='green' />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Xem thêm</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default FeedBackSection
