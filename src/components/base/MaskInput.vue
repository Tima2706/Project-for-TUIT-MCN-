<script lang="ts" setup>
import type { PropType, Ref } from 'vue'
import IMask from 'imask'

const props = defineProps({
  onlyMaskedPart: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Object as PropType<IMask.AnyMaskedOptions>,
    required: true,
  },
})

const emits = defineEmits(['update:modelValue', 'keydown'])

const mask = ref<IMask.InputMask<any>>()

const InputRef = ref() as Ref<HTMLInputElement>

onMounted(() => {
  mask.value = IMask(InputRef.value, props.options)
  if (props.modelValue)
    mask.value.unmaskedValue = props.modelValue || ''

  mask.value.on('accept', () => {
    emits('update:modelValue', mask.value?.unmaskedValue)
  })
})

const focus = () => {
  InputRef.value.focus()
}
const blur = () => {
  InputRef.value.blur()
}

watch(() => props.modelValue, (val) => {
  if (mask.value)
    mask.value.unmaskedValue = val
})

defineExpose({ focus, blur })
</script>

<template>
  <input ref="InputRef" type="text" class="input">
</template>

<style lang="scss" scoped>
@import "MaskInput";
</style>
