<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {defineProps, defineEmits, ref} from "vue";
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
const { t } = useI18n()


const props = defineProps({
  isFilterOpened: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['changed'])
const disabledDate = (current: Dayjs) => {
  return current && current > dayjs().endOf('day')
}
const DEFAULT_FILTER_DATA = {
  note: '',
  partner_organization_id: '',
  from_summa: null,
  to_summa: null,
  from_date: '',
  to_date: '',
  doc_number: '',
  product_name: '',
}
const filterData = ref<any>({ ...DEFAULT_FILTER_DATA })

const onSearch = (input: string) => {
  // Organization.value = input
}
const submit = () => {
  emit('changed', {
    ...filterData.value,
  })
  console.log(filterData.value)
}
</script>
<template>
  <div v-if="isFilterOpened === true">
    <hr style="color: #DFE2E9" class="my-4" />
    <div class="flex gap-2">
      <div  class="mb-3 ">
        <VText weight="500" size="12" class="mb-1">
          {{ $t('contractNumber') }}
        </VText>
        <a-input style="width: 122px;" v-model:value="filterData.doc_number" :placeholder="t('-')"  type="number" />
      </div>
      <div class="mb-3">
<!--        <VText weight="500" size="12" class="mb-1">-->
<!--          {{ $t('partner') }}-->
<!--        </VText>-->
<!--        <a-select-->
<!--            v-model:value="filterData.partner_organization_id"-->
<!--            style="width: 470px"-->
<!--            show-search-->
<!--            option-label-prop="children"-->
<!--            :filter-option="() => true"-->
<!--            @search="onSearch"-->
<!--        >-->
<!--          <ASelectOption-->
<!--              v-for="iten in organizations"-->
<!--              :key="item.id"-->
<!--              :value="item.id"-->
<!--          >-->
<!--          </ASelectOption>-->
<!--        </a-select>-->
      </div>
      <div class="mb-3">
        <VText weight="500" size="12" class="mb-1">
          {{ $t('nameOfProduct') }}
        </VText>
        <a-input v-model:value="filterData.product_name"  type="text" />
      </div>
    </div>
    <div class="flex justify-between mt-3">
      <div class="flex gap-2">
        <div class="mb-3">
          <VText weight="500" size="14" class="mb-1">
            {{ $t('date') }}
          </VText>
          <a-space>
            <a-date-picker :placeholder="$t('from')" v-model:value="filterData.from_date" />
            <a-date-picker :placeholder="$t('before')" v-model:value="filterData.to_date" />
          </a-space>
        </div>
        <div class="mb-3">
          <VText weight="500" size="14" class="mb-1">
            {{ $t('price') }}
          </VText>
          <a-space>
            <a-input style="width: 122px;" v-model:value="filterData.from_summa" :placeholder="t('from')" filterData  type="number" />
            <a-input style="width: 122px;" v-model:value="filterData.to_summa"   type="number" />
          </a-space>
        </div>
      </div>
      <div  class="flex items-center gap-2">
        <AButton  class="search_btn search_btn-apply mt-2" @click="submit" >
          {{ $t('apply') }}
        </AButton>
        <AButton class="search_btn search_btn-reset mt-2" @click="">
          {{ $t('reset') }}
        </AButton>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>

</style>
