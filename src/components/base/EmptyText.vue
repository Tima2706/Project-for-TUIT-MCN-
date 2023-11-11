<script setup lang="ts">
import EmptyBox from '~/assets/icons/empty-box.svg'
const { t } = useI18n()
</script>

<template>
  <div class="p-20">
    <div class="flex justify-center pb-5">
      <EmptyBox />
    </div>
    <div class="text-center font-bold text-base">
      {{ t('emptyBox') }}
    </div>
  </div>
</template>

<style scoped>

</style>
