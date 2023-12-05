<script lang="ts" setup>
import { TransitionSlide } from '@morev/vue-transitions'
import { useToken } from '~/composables/useToken'
// import {IS_DEV} from "~/utils/config";

type FORM_TYPE = 'withKey' | 'withLoginAndPassword'
const activeForm = ref<FORM_TYPE>('withKey')
const router = useRouter()
const route = useRoute()
const { getOrganization } = useOrganizationStore()
const { setToken, gotoLogin } = useToken()
const changeForm = (t: FORM_TYPE) => {
  activeForm.value = t
}
// const loading = ref(true)
// if (IS_DEV)
//   loading.value = false
// else
//   gotoLogin()

const isLoginWithKeyFormActive = computed(() => activeForm.value === 'withKey')

const onSuccessLogin = async ({ access_token, expiresIn }: { access_token: string; expiresIn: number }) => {
  const nextPath = (route.query.next as string) || { name: 'home' }
  setToken(access_token, expiresIn)
  await getOrganization()
  await router.replace(nextPath)
}

const onNeedToRegister = (tin: string) => {
  router.push({ name: 'register-tin', params: { tin } })
}
</script>

<template>
  <div v-if="!loading" style="min-height: 386px" class="login-page">
    <a-row>
      <a-col class="px-2">
        <a-button :type="isLoginWithKeyFormActive ? 'primary' : 'default'" class="toggle-button" size="large" @click="changeForm('withKey')">
          {{ $t('register') }}
        </a-button>
      </a-col>
      <a-col class="px-2">
        <a-button :type="!isLoginWithKeyFormActive ? 'primary' : 'default'" class="toggle-button" size="large" @click="changeForm('withLoginAndPassword')">
          {{ $t('loginInSystem') }}
        </a-button>
      </a-col>
    </a-row>
    <TransitionSlide mode="out-in">
      <AuthLoginWithKey v-if="isLoginWithKeyFormActive" @need-to-register="onNeedToRegister" @success="onSuccessLogin" />
      <AuthLoginWithLoginAndPassword @success="onSuccessLogin" />
    </TransitionSlide>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  .toggle-button {
    border-radius: 6px;
    color: #7A889B;
    border-color: transparent;
    box-shadow: 0 2px 2px rgba(122, 136, 155, 0.16);

    &.ant-btn-primary {
      color: #0096B2;
      background: rgba(0, 150, 178, 0.12);
      box-shadow: none;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: auth
</route>
