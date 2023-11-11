import { createI18n } from 'vue-i18n'
import { useStorageService } from '~/modules/storage-service'
import { type UserModule } from '~/types/types'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import

//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true }))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

const { $get } = useStorageService()

const selectedLanguage: { label: string; value: string } = $get()

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: selectedLanguage ? selectedLanguage.value : 'ru',
    fallbackLocale: ['uz', 'en'],
    missingWarn: false,
    fallbackWarn: false,
    messages,
  })

  app.use(i18n)
}
