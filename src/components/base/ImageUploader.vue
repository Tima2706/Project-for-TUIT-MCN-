<script lang="ts" setup>
import type { Ref } from 'vue'
import FolderIcon from '~/assets/icons/folder-line.svg'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const FileInputRef = ref() as Ref<HTMLInputElement>
const filename = ref('')

const handleBrowseFile = () => {
  FileInputRef.value.click()
}

const onSelectFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  filename.value = file?.name || ''
  emit('update:modelValue', file)
}
</script>

<template>
  <div class="wrapper">
    <div class="control" @click="handleBrowseFile">
      <div class="control__placeholder">
        {{ filename || 'Выбрать...' }}
        <ASpin v-if="loading" />
      </div>
      <FolderIcon class="control__icon" />
    </div>
    <div class="hint">
      <div class="hint__row">
        <span class="hint__label">{{ $t('photoSizeNotLessThen') }}:</span>
        <span class="hint__value">5 {{ $t('mb') }}</span>
      </div>
      <div class="hint__row">
        <span class="hint__label">{{ $t('format') }}:</span>
        <span class="hint__value">Jpeg, Png</span>
      </div>
    </div>

    <div class="file-list" />

    <input ref="FileInputRef" type="file" class="file-input" @change="onSelectFile">
  </div>
</template>

<style lang='scss' scoped>
@import './ImageUploader';
</style>
