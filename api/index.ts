export const ENDPOINT = {
  login: '/auth/login',
  register: '/customer/create',
  me: '/auth/me',
  profile: '/customer',
  changePassword: '/user/reset-password',
  getAllBranch: '/branch',
  getBranchDetail: (id: string) => `/branch/get-by-id/${id}`,
  getCourtAvailable: '/court/get-court-available',
  getPaymentInfo: '/payment/create-payment-url-for-booking'
}
