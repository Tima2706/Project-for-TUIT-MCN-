<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import { getBanks } from '~/services/banking.js'
import { useFetchData } from '~/composables/useFetch'
import {getBlockedBalance} from "~/services/transactionBalance";

const { t } = useI18n()

const value1 = ref('lucy')
const columns = [
  {
    title: t('documentNumber'),
    dataIndex: 'doc_number',
    key: 'doc_number',
  },
  {
    title: t('type'),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: t('DATA'),
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: t('МФО'),
    dataIndex: 'organization_account',
    key: 'organization_account.bank.mfo',
  },
  {
    title: t('Расчетный счет'),
    dataIndex: 'organization_account',
    key: 'organization_account.account',
  },
  {
    title: t('summa'),
    dataIndex: 'summa',
    key: 'summa',
  },

]
const lastPage = ref<number>(1)
const params = reactive({
  page: 1,
})

const {
  data: banks,
  loading: bankingLoading,
  fetch,
} = useFetchData<any[]>(
  async () => {
    const {
      data: { data, last_page },
    } = await getBlockedBalance(params)
    lastPage.value = last_page
    return { data }
  },
  { immediately: true },
)

const onChangePage = () => {
  fetch()
}


</script>

<template>
  <div>
    <VText weight="600" size="18" class="mb-4">
      {{ t("blockedDeposit") }}
    </VText>
    <div>
      <a-spin :spinning="bankingLoading">
        <a-table
          :pagination="false"
          :data-source="banks ? banks : []"
          :columns="columns"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'organization_account.bank.mfo'">
              {{ record.organization_account.bank.mfo }}
            </template>
            <template v-if="column.key === 'type'">
              {{ record.type === 10 ? $t('contractLocker'): $t('withdraw') }}
            </template>

            <template v-if="column.key === 'organization_account.account'">
              {{ record.organization_account.account }}
            </template>
            <template v-if="column.key === 'date'">
              {{ dayjs(record.date).format(DATE_TIME_FORMAT) }}
            </template>
            <template v-if="column.key === 'summa'">
              {{ record.summa }}
            </template>
          </template>
        </a-table>
        <a-pagination
          v-model:current="params.page"
          :total="10 * lastPage"
          show-less-items
          hide-on-single-page
          @change="onChangePage"
        />
      </a-spin>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
