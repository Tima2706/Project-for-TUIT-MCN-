<script setup lang="ts">
import type { ESignKey } from '@shohrux_saidov/eimzo-client'
import { initModuleEimzo } from '@shohrux_saidov/eimzo-client'
import { ref } from 'vue'
import { $http } from '~/services/baseHttp'

const file = ref('')

$http.get<Blob>('http://localhost:3000/files/contracts/item.pdf', {
  responseType: 'blob',
}).then((res) => {
  const fileReader = new FileReader()

  fileReader.onload = () => {
    file.value = fileReader.result as string
  }

  fileReader.readAsDataURL(res.data)
})

const eimzo = ref()

const userKeys = ref<ESignKey[]>([])
const selectedKey = ref<string>()

const getListOfKeys = async () => {
  eimzo.value = await initModuleEimzo()
  await eimzo.value.checkVersion()
  await eimzo.value.installApiKeys()
  userKeys.value = await eimzo.value.listAllUserKeys()
}

getListOfKeys()

const options = computed(() => {
  return userKeys.value.map((item) => {
    return {
      label: `${item.UID} ${item.CN}`,
      value: item.UID,
    }
  })
})

const selectedItem = computed(() => {
  return userKeys.value.find(item => item.UID === selectedKey.value)
})

const sign = async () => {
  const { hash: { pkcs7_64 } } = await eimzo.value.signPkcs7((selectedItem.value as ESignKey), file.value)

  const { data } = await $http.post('esign/sign', {
    pkcs7_64,
  })

  file.value = data.pkcs7b64
}

const check = async () => {
  await $http.post('esign/verify', {
    pkcs7_64: file.value,
  })
}
</script>

<template>
  <div>
    <div>
      Sign
    </div>

    <div>
      <ASelect
        v-model:value="selectedKey"
        style="width: 200px;"
        :options="options"
      />
      <embed v-if="file" style="height: 500px; width: 500px;" :src="file">
      <button style="background: blue; width: 120px; padding: 5px" @click="sign">
        Sign
      </button>
      <button style="background: blue; width: 120px; padding: 5px" @click="check">
        Check
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: auth
</route>
