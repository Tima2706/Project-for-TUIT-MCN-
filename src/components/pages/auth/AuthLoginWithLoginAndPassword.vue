<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import { isAxiosError } from 'axios'
import { login } from '~/services/authorizationService'
import type { LoginRequest } from '~/services/dto'

const emits = defineEmits(['success'])

const FormRef = ref()

const userCredential = ref<LoginRequest>({
  username: '',
  password: '',
})

const loading = ref(false)
const submit = async () => {
  loading.value = true
  try {
    const { data: { access_token, expiresIn } } = await login({ ...userCredential.value })
    emits('success', { access_token, expiresIn })
  }
  catch (e) {
    if (isAxiosError(e)) {
      notification.error({
        message: e.response?.data.message,
        description: e.response?.data.error,
      })
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page__auth-with-login">
    <ACard class="wrapper">
      <p class="title">
        {{ $t('loginInSystem') }}
      </p>

      <Form ref="FormRef" @submit="submit">
        <div class="form-control">
          <Field v-slot="{ errors }" :model-value="userCredential.username" name="username" rules="required">
            <AInput v-model:value="userCredential.username" :class="{ 'has-error': errors.length }" />
            <ErrorMessage name="username" />
          </Field>
        </div>
        <div class="form-control">
          <Field v-slot="{ errors }" :model-value="userCredential.password" name="password" rules="required">
            <AInput v-model:value="userCredential.password" class="login-input" :class="[{ 'has-error': errors.length }] " type="password" placeholder="Пароль" size="large" />
            <ErrorMessage name="password" />
          </Field>
        </div>

        <a-button :loading="loading" html-type="submit" size="large" class="submit-btn" type="primary">
          {{ $t('toComeIn') }}
        </a-button>
      </Form>
    </ACard>
  </div>
</template>

<style scoped lang="scss">
@import './authLoginWithPassword';
</style>
