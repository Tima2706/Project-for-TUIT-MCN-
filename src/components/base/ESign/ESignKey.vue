<script lang="ts" setup>
import type { ESignKey } from '~/types'
defineProps<{
  item: ESignKey | any
}>()

defineEmits(['select'])

const { t } = useI18n()
</script>

<template>
  <div class="key-wrapper profile" @click="$emit('select')">
    <div class="profile__header">
      <h3 class="profile__title">
        {{ item.CN }}
      </h3>
      <p class="profile__type">
        {{ t('entity') }}
      </p>
    </div>
    <div class="profile-tag">
      <div class="profile-tag__item">
        <p class="profile-tag__label">
          {{ t('tin') }}:
        </p>
        <p class="profile-tag__value">
          {{ item.TIN }}
        </p>
      </div>
      <div class="profile-tag__item">
        <p class="profile-tag__label">
          {{ t('JSHSHIR') }}:
        </p>
        <p class="profile-tag__value">
          {{ item.serialNumber }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../styles/components/ESign/esignKey";
</style>
