export const BasketStatus: Record<string, { value: string; bgColor: string; color: string }> = {
  LeftRequestFromCustomer: {
    value: 'LeftRequestFromCustomer',
    bgColor: 'warning-light',
    color: 'warning',
  },
  LeftRequestFromSeller: {
    value: 'LeftRequestFromSeller',
    bgColor: 'success-light',
    color: 'success',
  },
  ConclusionContract: {
    value: 'ConclusionContract',
    bgColor: 'danger-light',
    color: 'danger',
  },
  CancelledBySeller: {
    value: 'CancelledBySeller',
    bgColor: 'danger-light',
    color: 'danger',
  },
  CancelledByCustomer: {
    value: 'CancelledByCustomer',
    bgColor: 'danger-light',
    color: 'danger',
  },
  AcceptedByCustomer: {
    value: 'AcceptedByCustomer',
    bgColor: 'success-light',
    color: 'success',
  },
}
