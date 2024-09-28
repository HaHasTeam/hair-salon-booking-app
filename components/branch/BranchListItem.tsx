import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { IBranch } from '@/types/Branch'
const ImagePlace = require('@/assets/images/placeholder.png')
import { TabBarIcon } from '../navigation/TabBarIcon'
import { Link, useSegments } from 'expo-router'

const BranchListItem = ({
  item,
  onPressBranchCard,
  onPressBooking
}: {
  item: IBranch
  onPressBranchCard: (branchId: string | null) => any
  onPressBooking: (item: IBranch) => any
}) => {
  const segment = useSegments()
  const images = (item.images && item.images[0]) ?? ImagePlace

  return (
    <Link href={`/${segment.join('/')}/${item._id}`} asChild>
      <TouchableOpacity key={item._id} style={styles.card}>
        <View>
          <View style={styles.cardTop}>
            <Image alt={item.name} resizeMode='cover' style={styles.cardImg} src={images} />
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>

            <View style={styles.cardStats}>
              <View style={styles.cardStatsItem}>
                <TabBarIcon name='location' size={14} color={'#2d2d2d'} />
                <Text style={styles.cardStatsItemText} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.centerItem}>
                <TabBarIcon name='time-outline' size={14} color={'#000'} />
                <Text style={styles.cardFooterText}>{item.availableTime}</Text>
              </View>

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
                  schedule
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default BranchListItem

const styles = StyleSheet.create({
  /** Card */
  card: {
    width: '88%',
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  favoriteIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    top: 5,
    end: 5,
    backgroundColor: '#ffffff'
  },
  cardImg: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12

    // marginVertical: 20
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2d2d2d',
    width: '80%'
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: 'tomato'
  },
  centerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
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
    alignItems: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#909090'
  }
})
