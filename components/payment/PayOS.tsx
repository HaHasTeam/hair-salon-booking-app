import { Text, View } from 'native-base'
import type { PayOSConfig } from 'payos-checkout'
import { usePayOS } from 'payos-checkout'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

type Props = {
  url: string
  orderCode: string
  successTriggerFn: () => void
}

const PayOs = ({ url, orderCode, successTriggerFn }: Props) => {
  const ELEMENT_ID = `psyOs-${orderCode}`
  const [payStatus, setPayStatus] = React.useState<'success' | 'failed' | undefined>(undefined)
  const payOSConfig: PayOSConfig = {
    RETURN_URL: 'exp://26.41.74.208:8081', // required
    ELEMENT_ID, // required
    CHECKOUT_URL: url ?? '', // required

    embedded: false, // Nếu dùng giao diện nhúng
    onSuccess: (event: any) => {
      // TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
      console.log(event)
      setPayStatus('success')
      successTriggerFn()
    },
    onCancel: (event: any) => {
      // TODO: Hành động sau khi người dùng Hủy đơn hàng
      console.log(event)
      setPayStatus('failed')
    }
  }
  const { open } = usePayOS(payOSConfig)

  useEffect(() => {
    open()
  }, [])

  if (payStatus === 'success') {
    return (
      <>
        <View className='text-green-500'>
          <Text>Pay success, please wait a moment</Text>
        </View>
        <ActivityIndicator />
      </>
    )
  }
  if (payStatus === 'failed') {
    return (
      <View className='text-red-500'>
        <Text>Pay failed, please refresh page</Text>
      </View>
    )
  }
  return (
    <View className='flex w-full flex-col items-center gap-4'>
      <View id={ELEMENT_ID} className='h-[350px]' />
      <View className='text-yellow-500'>
        <Text>If you have payed the order, please wait a moment.</Text>
      </View>
    </View>
  )
}

export default PayOs
