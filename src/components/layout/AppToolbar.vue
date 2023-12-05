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
    <div class="logo-tuit">
      <VText style="color: #FFFFFF; font-weight: 600; font-size: 25px; font-style: italic">
        <a href="https://tuit.uz/">
        <img src="https://static.tuit.uz/assets/c4c88c23/img/src/newlogotype.png" alt="#" />
        </a>
      </VText>
    </div>
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
      <div @click="showDrawer">
        <p class="dropdown-trigger select-none">
          <UserProfileIcon />
          {{ organizationStore?.organization?.username }}
          <AngleDownIcon />
        </p>
      </div>
      <div class="user-profile-information">
      <a-drawer
        v-model:open="open"
        class="custom-class"
        root-class-name="root-class-name"
        :root-style="{ color: 'blue' }"
        style="color: #000000; background: rgb(19,30,44)"
        :title="$t('profile')"
        placement="right"
      >
        <ACard style="border: 1px solid #d5d3d3">
          <div class="mb-3">
          <VText>
            {{$t('username')}}
          </VText>
            <VText style="font-size: 16px; font-weight: 600; color: #4A5C71">
              {{organizationStore?.organization?.username}}
            </VText>
          </div>
          <div class="mb-3">
            <VText>
              {{$t('firstname')}}
            </VText>
            <VText style="font-size: 16px; font-weight: 600; color: #4A5C71">
              {{organizationStore?.organization?.firstname}}
            </VText>
          </div>
          <div class="mb-3">
            <VText>
              {{$t('lastname')}}
            </VText>
            <VText style="font-size: 16px; font-weight: 600; color: #4A5C71">
              {{organizationStore?.organization?.lastname}}
            </VText>
          </div>

        </ACard>
        <div style="cursor: pointer;" class="flex justify-center mt-5"  @click="handleLogout">
          <AButton style="color: #FFFFFF">{{ $t("exit") }}</AButton>
        </div>

      </a-drawer>
      </div>
    </div>
  </DTHeader>

  <!--  </div> -->
</template>

<style  lang="scss">

.dt-header_container .dt-header__navbar-right {
  justify-content: space-between !important;
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
