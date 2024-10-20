import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
type LoadingProps = {
  color?: string
  size?: 'small' | 'large'
  title?: string
}
const Loading = ({ color = 'green', size = 'small', title }: LoadingProps) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ActivityIndicator size={size} color={color} />
      {title && <Text>{title}</Text>}
    </View>
  )
}

export default Loading
