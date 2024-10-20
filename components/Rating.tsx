import { View, Text } from 'react-native'
import React from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
type RatingProps = {
  star: number
}
const Rating = ({ star }: RatingProps) => {
  return <StarRatingDisplay rating={star} starSize={20} />
}

export default Rating
