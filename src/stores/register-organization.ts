import { defineStore } from 'pinia'
import type { RegisterOrganizationInfo } from '~/types/register-organization'

export const useRegisterOrganizationStore = defineStore('register-organization', () => {
  const organizationData = ref<RegisterOrganizationInfo>({
    organizationName: '',
    address: '',
    orgTin: '',
    director: '',
    directorTin: '',
    email: '',
    website: '',
    phone_number: '',
    id: null,
  })

  return { organizationData }
})
