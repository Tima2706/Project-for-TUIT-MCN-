<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import type { ESignKey } from '@shohrux_saidov/eimzo-client'
import { initModuleEimzo } from '@shohrux_saidov/eimzo-client'
import { isAxiosError } from 'axios'
import FolderIcon from '~/assets/icons/folder-line.svg'
import InfoIcon from '~/assets/icons/info-line.svg'
import ESignKeyItem from '~/components/base/ESign/ESignKey.vue'
import { getChallenge } from '~/services/esign.service'
import { loginWithSign } from '~/services/authorizationService'

const emits = defineEmits(['success', 'needToRegister'])

const hasError = ref(false)
const userKeys = ref<ESignKey[]>([])
const selectedKey = ref<ESignKey | null>(null)
const eimzo = ref()
const loading = ref(false)
const getListOfKeys = async () => {
  try {
    eimzo.value = await initModuleEimzo()
    await eimzo.value.checkVersion()
    await eimzo.value.installApiKeys()
    userKeys.value = await eimzo.value.listAllUserKeys()
    selectedKey.value = userKeys.value[0]
  }
  catch (e) {
    hasError.value = true
  }
}

getListOfKeys()

const submit = async () => {
  loading.value = true
  try {
    const { data: { challenge } } = await getChallenge()
    const { hash: { pkcs7_64 } } = await eimzo.value.signPkcs7(selectedKey.value, challenge)
    const { data: { access_token, expiresIn, need_to_register, organization_tin } } = await loginWithSign({ pkcs7_64 })
    if (need_to_register) {
      emits('needToRegister', organization_tin)
      return
    }
    emits('success', { access_token, expiresIn })
  }
  catch (e) {
    if (typeof e === 'string') {
      notification.error({ message: e })
    }
    else if (isAxiosError(e)) {
      const message = e.response?.data?.message || e.message
      notification.error({ message })
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <a-card class="wrapper">
    <p class="title">
      {{ $t('loginWithEDS') }}
    </p>
    <a-dropdown :trigger="['click']">
      <div class="key-list-trigger">
        <p v-if="!selectedKey">
          {{ $t('chooseAKey') }}
        </p>
        <p v-else>
          {{ selectedKey?.CN }}
        </p>
        <FolderIcon class="key-list-trigger__icon" />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="key in userKeys" :key="key.UID">
            <ESignKeyItem :item="key" @select="selectedKey = key" />
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <p v-if="hasError" class="text-danger">
      {{ $t('youMayNotHaveEIMZO') }}
      <a href="">https://e-imzo.uz/</a>
    </p>
    <p class="subtitle">
      {{ $t('whatIsAnEDSKey') }}?
      <span class="subtitle__icon">
        <InfoIcon />
      </span>
    </p>
    <a-button :loading="loading" size="large" class="submit-btn" type="primary" @click="submit">
      {{ $t('signInWithEDS') }}
    </a-button>
  </a-card>
</template>

<style lang="scss" scoped>
@import "./AuthLoginWithKey";
</style>
