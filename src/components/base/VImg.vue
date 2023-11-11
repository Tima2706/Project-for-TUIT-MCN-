<script lang="ts" setup>
import { API_FILE_URL } from '~/utils/config'

const props = defineProps({
  srcFromLocalServer: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
})

const imageSrc = computed(() => {
  if (props.srcFromLocalServer)
    return `${API_FILE_URL}/${props.src}`
  return props.src
})
</script>

<template>
  <img :src="imageSrc" :alt="alt">
</template>
