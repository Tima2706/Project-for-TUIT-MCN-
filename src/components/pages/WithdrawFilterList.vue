<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {defineProps, defineEmits, ref} from "vue";
import {organizationWuthdrawal, postOrganizationWithdrawal} from "~/services/transactionBalance";
import {notification} from "ant-design-vue";
import {useServerError} from '~/services/useServerError'
import {DEFAULT_ERROR_MESSAGE, SAVED_SUCCESSFULLY} from '~/utils/constants'
import {ErrorMessage, Field, Form, configure} from 'vee-validate'
import {getUserInfo} from "~/services/userInformation";


const {t} = useI18n()
const loading = ref(false)
const organizations = ref<any>([])
const formRef = ref()
const submitLoading = ref(false)
const {getFieldErrors} = useServerError()

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
}
const checkBalance = (rule, value, callback) => {
  if (organization.value.data.available_balance <= value) {
    callback();
  } else {
    callback(new Error(t('balanceError')));
  }
};

const form = ref<any>({...DEFAULT_FILTER_DATA})

const getOrganizationForSearch = async () => {
  const {data: data} = await organizationWuthdrawal()
  organizations.value = {data}
}

const submit = async () => {
  try {
    await postOrganizationWithdrawal({...form.value})
    notification.success({
      message: SAVED_SUCCESSFULLY,
    })
    emit('changed');
    setTimeout(() => {
      window.location.reload();

    }, 600)
  } catch (err: any) {
    notification.error({
      message: DEFAULT_ERROR_MESSAGE,
    })
    formRef.value.setErrors(getFieldErrors(err))

  } finally {
    submitLoading.value = false
  }

}


getOrganizationForSearch()
</script>
<template>
  <a-card>
    <div>
      <Field
        ref="formRef"
        name="advanced_search"
        class="ant-advanced-search-form"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <p style="padding-bottom: 8px">{{ $t('tin') }}</p>
            <div class="mb-5" style=" padding: 10px; border-radius: 12px; background: #F0F4F9; ">
              <VText class="text-dark"> {{ organizations?.data?.tin }}</VText>
            </div>
            <VText size="12" weight="400" class="mb-2">
              {{ $t('checkingAccount') }}
            </VText>
            <Field :model-value="form.account" name="account" :rules="{required: true, min: 500}">
              <a-select
                v-model:value="form.account"
                show-search
                allow-clear
                style="width: 100%"
                :field-names="{ label: 'account', value: 'account' }"
                :options="organizations?.data?.items"
                :filter-option="filterOption"
              />
              <div class="helper-message">
                <ErrorMessage name="account"/>
              </div>
            </Field>
            <VText size="12" weight="400" class="mb-2">
              {{ $t('transactionAmount') }}
            </VText>
            <Field
              v-slot="{ errors }"
              :model-value="form.summa"
              :name="$t('summa')"
              :rules="[{ required: true },{ validator: checkBalance }]">
              <a-input type="number" :class="{ 'has-error': errors.length }" :placeholder="$t('sum')"
                       v-model:value="form.summa"/>
              <ErrorMessage :name="$t('summa')"/>
            </Field>
            <v-text class="pt-2"><span>Можно вывести</span>:
              {{ organizations?.data?.available_balance ? organizations?.data?.available_balance : '0' }}
              {{ $t('summa') }}
            </v-text>

          </a-col>
          <a-col :span="12">
            <p style="padding-bottom: 8px">{{ $t('name') }}</p>
            <div class="mb-5" style=" padding: 10px; border-radius: 12px; background: #F0F4F9;">
              <VText class="text-dark"> {{ organizations?.data?.name }}</VText>
            </div>
            <VText size="12" weight="400" class="mb-2">
              {{ $t('purposeOfPayment') }}
            </VText>
            <Field v-slot="{ errors }" :model-value="form.note" name="note" rules="required">
              <a-textarea
                :class="{ 'has-error': errors.length }"
                v-model:value="form.note"
                :autoSize="false"
                :rows="4"
              />
              <div class="helper-message">
                <ErrorMessage name="note"/>
              </div>
            </Field>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button @click="submit" type="primary" html-type="submit">
              {{ $t('withdraw') }} !
            </a-button>
          </a-col>
        </a-row>
      </Field>
    </div>
  </a-card>


</template>


<style lang="scss" scoped>
.search_btn-reset {
  background: #D65E81;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  font-weight: 500;
  transition: .8s;

  &:hover {
    border: 1px solid #D65E81;
    background: #FFFFFF;
    color: #D65E81;
  }
}

.search_btn-apply {
  background: #FFFFFF;
  color: #0096B2;
  transition: .8s;
  font-weight: 500;

  &:hover {
    border: 1px solid #0096B2;
    background: #0096B2;
    color: #FFFFFF;
  }
}
</style>
