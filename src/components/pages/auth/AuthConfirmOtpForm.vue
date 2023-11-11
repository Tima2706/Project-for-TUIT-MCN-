<script lang="ts" setup>
import { KEYBOARD_KEYS } from '~/utils/constants'
import { confirmOtp } from '~/services/authorizationService'
import MaskInput from '~/components/base/MaskInput.vue'

const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
})

defineEmits(['submit'])

const router = useRouter()

const OTP_SIZE = 6

const InputRefs = reactive<any[]>([])
const values = reactive<string[]>(['1', '2', '3', '4', '5', '6'])
const currentActiveInputIndex = ref(0)

const onInputOtp = (index: number) => {
  const nextInput = InputRefs[index + 1]
  if (nextInput) {
    nextInput.focus()
    currentActiveInputIndex.value++
  }
}

const isValid = computed(() => {
  return values.length === OTP_SIZE && values.every(item => !!item)
})

const onFocus = (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  if (target.value) {
    setTimeout(() => {
      target.select()
    }, 100)
  }
}

const onKeyDown = (e: any, index: number) => {
  if (values[index])
    return
  if (e.code === KEYBOARD_KEYS.Backspace && index) {
    const prevInput = InputRefs[index - 1]
    prevInput.focus()
  }
}

onMounted(() => {
  InputRefs[0].focus()
})

const loading = ref(false)
const submit = async () => {
  loading.value = true
  try {
    const { data: { authorization: { token } } } = await confirmOtp({
      phone: props.phone,
      token: props.token,
      code: values.join(''),
    })
    localStorage.setItem('token', token)
    await router.replace('/')
  }
  catch (e) {

  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <ACard class="wrapper login-page__auth-with-login__confirm">
    <p class="text-lg text-center ">
      {{ $t('loginWithPhoneNumber') }}
    </p>
    <div class="text-center mb-4">
      <ATypographyText class="text-center " type="success">
        +998{{ phone }}
      </ATypographyText>
    </div>

    <form class="form" @submit.prevent="submit">
      <div class="row">
        <div
          v-for="(item, index) in OTP_SIZE"
          :key="item"
          class="column"
        >
          <MaskInput
            :ref="el => InputRefs[index] = el"
            v-model="values[index]"
            :options="{ mask: '0' }" @keydown="(e) => onKeyDown(e, index)" @focus="onFocus" @update:model-value="() => onInputOtp(index)"
          />
        </div>
      </div>
      <div class="text-right mt-4">
        <AButton html-type="submit" :loading="loading" :disabled="!isValid" size="large" type="primary" style="width: 100%; height: 50px">
          {{ $t('toComeIn') }}
        </AButton>
      </div>
    </form>
  </ACard>
</template>

<style lang='scss' scoped>
@import './AuthConfirmOtpForm';
</style>
