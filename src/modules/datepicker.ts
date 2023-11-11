import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import type { UserModule } from '~/types/types'

export const install: UserModule = ({ app }) => {
  app.component('VueDatePicker', VueDatePicker)
}
