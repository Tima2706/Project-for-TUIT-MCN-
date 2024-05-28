<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DTHeader from '@shohrux_saidov/dt-header'
import AngleDownIcon from '~/assets/icons/angle-down.svg'
import UserProfileIcon from '~/assets/icons/user-tag-line.svg'
import { useToken } from '~/composables/useToken'
import { useStorageService } from '~/modules/storage-service'
import '@shohrux_saidov/dt-header/dist/style.css'
import Cookies from 'universal-cookie'
import {getUserInfo} from "~/services/userInformation";
import {getNoteList} from "~/services/interfaces/note";
const open = ref<boolean>(false);
const loading = ref(false)


const showDrawer = () => {
  open.value = true;
};

interface Language {
  value: string
  label: string
}
const cookies = new Cookies(null, { path: '/' })

const loadData = async () => {
    try {
        const {
            data: {data},
        } = await getUserInfo()
       return {data}
    } catch (err) {
        console.error(err)
    } finally {
    }
}
const { locale } = useI18n({ useScope: 'local' })
const { $set, $get } = useStorageService()

const organizationStore = useOrganizationStore()

const router = useRouter()
const {logout, removeToken} = useToken()
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
loadData()

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
    <div class="flex navbar-dropdown justify-end">
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
      <div @click="showDrawer">
        <p class="dropdown-trigger select-none">
          <UserProfileIcon />
          {{ organizationStore?.organization?.username }}
          <AngleDownIcon />
        </p>
      </div>
      <div >
      <a-drawer
        v-model:open="open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        style="color: #000000; background: rgb(255,255,255)"
        :title="$t('profile')"
        placement="right"
      >
          <div class="mb-3">
          <VText style="color: darkgray">
            {{$t('username')}}
          </VText>
            <VText style="font-size: 16px; font-weight: 600; color: #4A5C71">
              {{organizationStore?.organization?.username}}
            </VText>
          </div>
          <div class="mb-3">
            <VText style="color: darkgray">
              {{$t('firstname')}}
            </VText>
            <VText style="font-size: 16px; font-weight: 600; color: #4A5C71">
              {{organizationStore?.organization?.firstname}}
            </VText>
          </div>
          <div class="mb-3" >
            <VText style="color: darkgray">
              {{$t('lastname')}}
            </VText>
            <VText style="font-size: 16px; font-weight: 600; color: #4A5C71">
              {{organizationStore?.organization?.lastname}}
            </VText>
          </div>
        <a-divider/>
        <div
          class="w-full flex gap-2 items-center border-[1px] border-[#DFE2E9] py-2 px-3 rounded-md text-[#D65E81]"
          @click="handleLogout"
        >
          <Logout/>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
            <path stroke="#D65E81" stroke-linecap="round" stroke-linejoin="round"
                  d="M5.6 13.475H1.925c-.371 0-.727-.152-.99-.421a1.46 1.46 0 0 1-.41-1.018V1.964c0-.382.148-.748.41-1.017.263-.27.619-.422.99-.422H5.6M9.976 10.5l3.5-3.5-3.5-3.5M13.475 7h-8.4"></path>
          </svg>
          <p class="cursor-pointer">{{ $t('exitTheOffice') }}</p>
        </div>
      </a-drawer>
      </div>
    </div>
  </DTHeader>

  <!--  </div> -->
</template>

<style  lang="scss">
.ant-drawer-content-wrapper{
  width: 298px !important;
}
.ant-drawer-header {
  background: #FFFFFF;
}

.ant-drawer-close {
  svg {
    fill: #4A5C71;
  }
}

.ant-drawer-title {
  color: #4A5C71 !important;
}
.dt-header_container .dt-header__navbar-right {
  justify-content: flex-end !important;
  flex-grow: 1;
}

.dt-header_container .dt-header__logo, .dt-header_container .dt-header__menu-icon{
  display: none !important;
}
.dt-header__nav{
  display: none !important;
}
.ant-drawer-header{
  background: #FFFFFF;
}
.ant-drawer-close{
  svg{
    fill: #4A5C71;
  }
}
.ant-drawer-title{
  color: #4A5C71 !important;
}

//::-webkit-scrollbar{
//  width: 15px;
//}
//::-webkit-scrollbar-track{
//  background: #FFFFFF;
//}
//::-webkit-scrollbar-thumb{
//  background: #616a80;
//}
</style>
