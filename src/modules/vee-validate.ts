import { ErrorMessage, Field, Form, configure, defineRule } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { email, length, max, min, required, url } from '@vee-validate/rules'
import type { ViteSSGContext } from 'vite-ssg'
import { LANGUAGES_KEY_FOR_STORAGE } from '~/utils/constants'
defineRule('required', required)
defineRule('max', max)
defineRule('min', min)
defineRule('email', email)
defineRule('url', url)
defineRule('length', length)

defineRule('phone', (value: string) => {
  if (!value)
    return true

  return /^(\d{2})\d{3}\d{4}$/.test(value)
})
configure({
  generateMessage: localize({
    en: {
      messages: {
        required: 'The field is required',
      },
    },
    ru: {
      messages: {
        required: 'Поле, обязательное для заполнения',
      },
    },
    uz: {
      messages: {
        required: 'Ushbu maydonni to\'ldirilishi shart',
      },
    },
  }),
})

const localizeFromStorage = localStorage.getItem(LANGUAGES_KEY_FOR_STORAGE)

if (localizeFromStorage)
  setLocale(localizeFromStorage)

export const install = ({ app }: ViteSSGContext) => {
  app.component('Form', Form)
  app.component('Field', Field)
  app.component('ErrorMessage', ErrorMessage)
}
