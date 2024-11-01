import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { Fragment } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import FeedBackItem from './FeedBackItem'
import Rating from './Rating'
import { format } from 'date-fns'
import { formatToVND } from '../utils/utils'
const ReceiptCard = ({ item, onPressReceiptCard }: { onPressReceiptCard: (id: string) => any }) => {
  console.log(item, 'item')

  const router = useRouter()
  const canFeedback = () => {
    console.log(item.status, item.feedback)

    if (item.status === 'Done' && !!!item.feedback) {
      return true
    }
    return false
  }

  const onClickFeedback = (e: any) => {
    router.push('/(modal)/feedbackCreate?booking=' + item._id + '&branch=' + item.branch)
  }
  const onPressReceiptCard2 = (id: string) => {
    if (item.feedback) {
      router.push(`/(tabs)/receipt/${id}` + '?feedback=' + encodeURIComponent(JSON.stringify(item.feedback)))
    }
    router.push(`/(tabs)/receipt/${id}`)
  }
  return (
    <TouchableOpacity
      key={item._id}
      onPress={() => {
        onPressReceiptCard2(item._id)
      }}
      style={styles.card}
    >
      <View style={styles.cardColumn}>
        <View style={styles.cardTop}>
          <Icon name='ticket-confirmation' size={50} color='#000' />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item?.court[0]?.branch?.name}
            </Text>
          </View>

          <View style={styles.cardStats}>
            <View style={styles.cardStatsItem}>
              <Text style={styles.cardStatsItemText}>{item.paymentType}</Text>
            </View>
            <View>
              <Text style={styles.cardPrice}>{formatToVND(Number(item.totalPrice))}</Text>
            </View>

            {/* <View style={styles.cardStatsItem}>
                  <Text style={styles.cardStatsItemText}>{item.branch.name}</Text>
                </View> */}
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>{format(item.startDate, 'yyyy-MM-dd')}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
              }}
            >
              <Text
                style={{
                  marginHorizontal: 5,
                  verticalAlign: 'bottom',
                  marginTop: 'auto'
                }}
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {item?.feedback && (
        <View
          style={{
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 5,
            alignSelf: 'flex-start',
            marginTop: 5,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            gap: 5
          }}
        >
          <Rating star={item.feedback.star} />
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              borderTopColor: 'black',
              borderTopWidth: 1,
              fontSize: 16,
              padding: 5
            }}
          >
            {item.feedback?.feedback.slice(0, 100) + '...'}
          </Text>
        </View>
      )}
      {canFeedback() && (
        <TouchableOpacity onPress={onClickFeedback}>
          <View
            style={{
              backgroundColor: 'green',
              padding: 5,
              borderRadius: 5,
              alignSelf: 'flex-start',
              marginTop: 5,

              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5
            }}
          >
            <Ionicons name='star' size={20} color='white' />

            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                textAlign: 'center',
                fontSize: 16
              }}
            >
              Rating service
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

export default ReceiptCard

const styles = StyleSheet.create({
  /** Card */
  card: {
    width: '90%',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 15,
    marginTop: 15,
    shadowColor: '#000',
    overflow: 'hidden',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  cardColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  limitedSale: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: 5,
    zIndex: 12,
    borderRadius: 2,
    alignSelf: 'flex-start',

    top: 0,
    start: 0
  },
  limitedSaleText: {
    color: 'white',
    fontWeight: '700'
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '30%',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  favoriteIcon: {
    position: 'absolute',
    alignSelf: 'flex-start',
    padding: 10,
    top: 0,
    end: 5
  },
  cardImg: {
    width: '100%',

    height: 150,
    aspectRatio: '2/3',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
    // marginVertical: 20,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: '70%'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d2d2d',
    width: '100%'
  },
  cardPriceLimited: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 5,
    color: 'gray',

    textDecorationLine: 'line-through'
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    paddingRight: 20,
    color: 'green'
    // textDecorationLine: "line-through",
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -12
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#909090'
  }
})
