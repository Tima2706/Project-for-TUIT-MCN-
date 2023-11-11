<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
  },
  theme: {
    type: String,
  },
  minWidth: {
    type: String,
  },
  padding: {
    type: String,
  },
})

const styles = computed(() => {
  const allStyles: Record<string, string> = {
    'color': props.color || '#868EAA',
    'background-color': props.theme || 'rgba(134, 142, 170, 0.24)',
    'padding': props.padding || '5px 12px',
    'min-width': props.minWidth || '',
  }
  return allStyles
})
</script>

<template>
  <div class="v-status" :style="styles" v-bind="$attrs">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.v-status {
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
}
</style>
