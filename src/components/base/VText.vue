<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  weight: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: [String, Number],
  },
  dark: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark',
  },
})

const styles = computed(() => {
  const styles: Record<string, string> = {
    'font-size': `${props.size}px` || '14px',
    'color': props.color || '#303D4D',
    'font-weight': props.weight || '400',
  }
  if (props.dark)
    styles.color = '#fff'
  if (props.mode === 'light')
    styles.color = '#7A889B'
  return styles
})
</script>

<template>
  <div
    class="v-text"
    :style="styles"
  >
    <slot />
  </div>
</template>
