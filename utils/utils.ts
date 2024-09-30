import { ISlot } from '@/types/Slot'

export const HEADER_HEIGHT = 250
export function formatToVND(amount: number): string {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return formatter.format(amount)
}
export function getThu(date: Date | undefined): string {
  const day = date?.getDay()

  let thu: string
  switch (day) {
    case 0:
      thu = 'Sunday'

      break
    case 1:
      thu = 'Monday'

      break
    case 2:
      thu = 'Tuesday'

      break
    case 3:
      thu = 'Wednesday'

      break
    case 4:
      thu = 'Thursday'

      break
    case 5:
      thu = 'Friday'
      break
    case 6:
      thu = 'Saturday'

      break
    default:
      thu = 'error'
      break
  }

  return thu
}

export function calculateTotalPrice(slots: ISlot[], courtPrice: number): number {
  let sum = 0
  for (const slot of slots) {
    sum += (1 + slot.surcharge) * courtPrice
  }
  return sum
}
