import type { App } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
export default {
  install(app: App) {
    app.component('VueDatePicker', VueDatePicker)
  },
}
