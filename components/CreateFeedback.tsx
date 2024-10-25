import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const CreateFeedback = () => {
  return (
    <>
      <Link href={'/(tabs)/receipt'} asChild>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 2
          }}
        >
          <Ionicons name='create-outline' size={24} color='green' />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Viết đánh giá</Text>
        </TouchableOpacity>
      </Link>
    </>
  )
}

export default CreateFeedback
