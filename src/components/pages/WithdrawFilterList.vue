<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {defineProps, defineEmits, ref} from "vue";
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import {organizationWuthdrawal, postOrganizationWithdrawal} from "~/services/transactionBalance";
import {notification} from "ant-design-vue";
import { useServerError } from '~/services/useServerError'

const { t } = useI18n()
const loading = ref(false)
const organizations = ref<any>([])
const formRef = ref()
const submitLoading = ref(false)
const { getFieldErrors } = useServerError()

const filterOption = (input: string, option: any) => {
  return option?.account.toLowerCase().includes(input.toLowerCase());
};
const disabled = ref(false)
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

const DEFAULT_FILTER_DATA = {
  type: 5,
  summa: '',
  account: '',
  note: '',
  from_organization: 'organization_id=8e636341-d899-40ee-8819-74edec19e6fc'
}

const form = ref<any>({ ...DEFAULT_FILTER_DATA })

const getOrganizationForSearch = async () => {
  const { data: data } = await organizationWuthdrawal()
  organizations.value = {data}
}
const submit = async () => {
   // const organization_id = organizations?.value?.data?.items[0]?.organization_id
   //  form.value.from_organization = organization_id
    try {
        await postOrganizationWithdrawal({...form.value})
      notification.success({
        message: 'Успешно',
        description:
            'Продукт успешно сохранено',
      })
      emit('changed');
    }
    catch (err: any) {
      console.log(err)
      formRef.value.setErrors(getFieldErrors(err))
    }
    finally {
      submitLoading.value = false
    }

}

const currenValue = computed(() => {
  return organizations?.data?.available_balance
})


// const validateSumma = async (value) => {
//   const availableBalance = organizations?.data?.available_balance || 0;
//   if (value && parseFloat(value) > availableBalance) {
//     throw new Error('Сумма не может быть больше доступного баланса');
//   }
// };
getOrganizationForSearch()
</script>
<template>
  <a-card>
    <div>
      <a-form
          ref="formRef"
          name="advanced_search"
          class="ant-advanced-search-form"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <p style="padding-bottom: 8px">{{$t('tin')}}</p>
            <div class="mb-5" style=" padding: 10px; border-radius: 12px; background: #F0F4F9;">
             <VText class="text-dark"> {{organizations?.data?.tin}}</VText>
            </div>
            <a-form-item name="Расчетный счет" label="Расчетный счет">
                      <a-select
                          v-model:value="form.account"
                          show-search
                          allow-clear
                          style="width: 470px"
                          :field-names="{ label: 'account', value: 'account' }"
                          :options="organizations?.data?.items"
                          :filter-option="filterOption"
                      />
            </a-form-item>
            <a-form-item name="Сумма проводки" label="Сумма проводки" >
              <a-input  v-model:value="form.summa" />
              <v-text>Можно вывести: {{organizations?.data?.available_balance ? organizations?.data?.available_balance : '0' }} сум</v-text>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <p style="padding-bottom: 8px">{{$t('name')}}</p>
            <div class="mb-5" style=" padding: 10px; border-radius: 12px; background: #F0F4F9;">
              <VText class="text-dark"> {{organizations?.data?.name}}</VText>
            </div>
            <a-form-item>
              <a-textarea
                  v-model:value="form.note"
                  :autosize="true"
                  placeholder="Basic usage"
                  :rows="4"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button @click="submit" type="primary" html-type="submit">
              {{$t('withdraw')}} !
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-card>


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
