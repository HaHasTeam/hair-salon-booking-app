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
