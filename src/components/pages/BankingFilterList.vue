<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {defineProps, defineEmits, ref} from "vue";
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import {getOrganizationPartner} from "~/services/transactionBalance";


const { t } = useI18n()

const organizations = ref<any>([])
const filterOption = (input: string, option: any) => {
  return option?.name.toLowerCase().includes(input.toLowerCase());
};
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
const reset = () => {
  filterData.value = { ...DEFAULT_FILTER_DATA };
}

const filterData = ref<any>({ ...DEFAULT_FILTER_DATA })
const getOrganizationForSearch = async () => {
  const { data } = await getOrganizationPartner()
  organizations.value = data.data
}

const onSearch = (input: string) => {
  organizations.value = input
}

const submit = () => {
  emit('changed', {
    ...filterData.value,
  })
  console.log(filterData.value)
}
getOrganizationForSearch()
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
<!--      <div class="mb-3">-->
<!--        <VText weight="500" size="12" class="mb-1">-->
<!--          {{ $t('partner') }}-->
<!--        </VText>-->
<!--        <a-select-->
<!--            v-model:value="filterData.partner_organization_id"-->
<!--            show-search-->
<!--            allow-clear-->
<!--            style="width: 470px"-->
<!--            :field-names="{ label: 'name', value: 'id' }"-->
<!--            :options="organizations"-->
<!--            :filter-option="filterOption"-->
<!--            @change="onSearch"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="mb-3">-->
<!--        <VText weight="500" size="12" class="mb-1">-->
<!--          {{ $t('nameOfProduct') }}-->
<!--        </VText>-->
<!--        <a-input style="width: 435px" v-model:value="filterData.product_name"  type="text" />-->
<!--      </div>-->
    </div>
    <div class="flex justify-between mt-3">
      <div class="flex gap-2 items-center">
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
        <div class="mb-2">
          <VText weight="500" size="12" class="mb-1">
            {{ $t('note') }}
          </VText>
          <AInput style="width: 289px" placeholder="-" v-model:value="filterData.note" />
        </div>
      </div>
      <div  class="flex items-center gap-2">
        <AButton  class="search_btn search_btn-apply mt-2" @click="submit" >
          {{ $t('apply') }}
        </AButton>
        <AButton class="search_btn search_btn-reset mt-2" @click="reset">
          {{ $t('reset') }}
        </AButton>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.search_btn-reset{
  background: #D65E81;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  font-weight: 500;
  transition: .8s;
  &:hover{
    border: 1px solid #D65E81;
    background: #FFFFFF;
    color: #D65E81;
  }
}
.search_btn-apply{
  background: #FFFFFF;
  color: #0096B2;
  transition: .8s;
  font-weight: 500;
  &:hover{
    border: 1px solid #0096B2;
    background: #0096B2;
    color: #FFFFFF;
  }
}
</style>
