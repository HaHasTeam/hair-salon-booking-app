import { TonalColorsInput } from './../node_modules/canvaskit-wasm/types/index.d'
import { ICourt } from '@/types/Court'
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
export function calculateTotalServicePrice(products: ICourt[]): string {
  const total = products.reduce((total, product) => {
    return total + product.price
  }, 0)
  return formatToVND(total)
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

export function calculateTotalPricePerCourt(slots: ISlot[], courts: ICourt[]): number {
  const results = []
  for (const court of courts) {
    let sum = 0
    const courtPrice = court.price // Replace with your logic to get the price for each court

    for (const slot of slots) {
      sum += (1 + slot.surcharge) * courtPrice
    }
    results.push({ court, totalPrice: sum })
  }
  const totalPrice = results.reduce((acc, current) => acc + current.totalPrice, 0)

  return totalPrice
}
