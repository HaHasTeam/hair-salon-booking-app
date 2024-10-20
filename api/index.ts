export const ENDPOINT = {
  login: '/auth/login',
  register: '/customer/create',
  me: '/auth/me',
  profile: '/customer',
  changePassword: '/user/reset-password',
  getAllBranch: '/branch',
  postBooking: '/booking',
  getBranchDetail: (id: string) => `/branch/get-by-id/${id}`,
  getCourtAvailable: '/court/get-court-available',
  getPaymentInfo: '/payment/create-payment-url-for-booking',
  uploadImages:"/file/upload",
  postFeedback: '/feedback',
  getFeedbackByBranchId: (id: string) => `/feedback/get-of-branch/${id}`,
  getFeedbackById: (id: string) => `/feedback/get-by-id/${id}`,
}
