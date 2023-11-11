<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DTHeader from '@shohrux_saidov/dt-header'
import AngleDownIcon from '~/assets/icons/angle-down.svg'
import UserProfileIcon from '~/assets/icons/user-tag-line.svg'
import { useToken } from '~/composables/useToken'
import { useStorageService } from '~/modules/storage-service'
// import {transactionBalance} from "~/services/dto/transcationBalance";
// import {getTransactionBalance} from "~/services/transactionBalance";
import '@shohrux_saidov/dt-header/dist/style.css'
import Cookies from 'universal-cookie'

interface Language {
  value: string
  label: string
}
const cookies = new Cookies(null, { path: '/' })

const { locale } = useI18n({ useScope: 'local' })
const { $set, $get } = useStorageService()

const organizationStore = useOrganizationStore()

const router = useRouter()
const { removeToken } = useToken()

const isOpenSubMenu = ref(false)
const menu1Ref = ref()
const menu2Ref = ref()
const menu2ChildRef = ref()

const languageList = ref<Array<Language>>([
  { value: 'uz', label: 'languages.uz' },
  { value: 'en', label: 'languages.en' },
])

const currentLanguage = ref<Language>({ value: 'ru', label: 'languages.ru' })
cookies.set('lang', currentLanguage.value.value)
watch(isOpenSubMenu, (val) => {
  setTimeout(() => {
    if (val && menu2Ref.value) {
      menu2Ref.value.style.paddingLeft = `${menu1Ref.value.offsetLeft + 16}px`
      menu2ChildRef.value.style.maxWidth = `${menu1Ref.value.offsetWidth}px`
    }
  }, 20)
})

const changeLanguage = (selectedLanguage: Language, i: number) => {
  languageList.value.push(currentLanguage.value)
  currentLanguage.value = { ...selectedLanguage }
  languageList.value.splice(i, 1)
  $set(selectedLanguage)
  window.location.reload()
}

const checkLanguage = () => {
  const selectedLanguage: { label: string; value: string } = $get()
  if (selectedLanguage) {
    const lang = languageList.value.find(
      p => p.value === selectedLanguage.value,
    )
    if (lang) {
      languageList.value.push(currentLanguage.value)
      languageList.value = languageList.value.filter(
        p => p.value !== lang.value,
      )
      currentLanguage.value = lang
      locale.value = lang.value
    }
  }
}
checkLanguage()

const handleLogout = () => {
  removeToken()
  router.replace({ name: 'auth-login' })
}

const mainNavActive = ref(false)

function menuToggle() {
  mainNavActive.value = !mainNavActive.value
}

const maxWidth = 1060

function updateIsOpenSubMenu() {
  isOpenSubMenu.value = window.innerWidth <= maxWidth
}

updateIsOpenSubMenu()
window.addEventListener('resize', updateIsOpenSubMenu)
</script>

<template>
  <!--  <div class="ant-layout-header__inner"> -->
  <DTHeader>
    <div class="flex navbar-dropdown">
      <div class="action action-language">
        <a-dropdown :trigger="['click']">
          <p class="dropdown-trigger select-none">
            {{ $t(currentLanguage.label) }}
            <AngleDownIcon />
          </p>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <div
                  v-for="(language, i) in languageList"
                  :key="`language-${i}`"
                >
                  <p @click="changeLanguage(language, i)">
                    {{ $t(language.label) }}
                  </p>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="dropdown-trigger-separator" />
      <div v-if="organizationStore?.organization" class="action" />
      <a-dropdown :trigger="['click']">
        <p class="dropdown-trigger select-none">
          <UserProfileIcon />
          {{ organizationStore?.organization?.name }}
          <AngleDownIcon />
        </p>
        <template #overlay>
          <a-menu>
            <div class="dropdown-solid-line" />
            <a-menu-item @click="handleLogout">
              <p>{{ $t("exitTheOffice") }}</p>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </DTHeader>

  <!--  </div> -->
</template>

<style scoped></style>
