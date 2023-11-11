<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import BalanceStatusForm from '~/components/pages/balance/BalanceStatusForm.vue'
import { useFetchData } from '~/composables/useFetch'
import type { TransactionBalance } from '~/services/dto/transcationBalance'
import { getOperations, getTransactionBalance } from '~/services/transactionBalance'

const { t } = useI18n()

const columns = [

  {
    title: t('DATA'),
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: t('documentNumber'),
    dataIndex: 'doc_number',
    key: 'doc_number',
  },
  {
    title: t('status'),
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: t('NOTES'),
    dataIndex: 'note',
    key: 'note',
  },

  {
    title: t('summa'),
    dataIndex: 'summa',
    key: 'summa',
  },

]

const { data: transactionBalance, loading: transactionBalanceLoading } = useFetchData<TransactionBalance>(async () => {
  const { data } = await getTransactionBalance()
  return { data }
}, { immediately: true })

const lastPage = ref(1)
const params = reactive({
  page: 1,
})

const { data: operations, loading: operationsLoading, fetch } = useFetchData<any[]>(async () => {
  const { data: { data, last_page } } = await getOperations({ ...params })
  lastPage.value = last_page
  return { data }
}, { immediately: true })

const onChangePage = () => {
  fetch()
}
</script>

<template>
  <div>
    <VText weight="600" size="18">
      {{ t("balance") }}
    </VText>
    <BalanceStatusForm v-if="transactionBalance" :loading="transactionBalanceLoading" :info="transactionBalance" />
    <VText weight="600" size="18" class="mt-6">
      {{ t("operations") }}
    </VText>
    <div>
      <a-spin :spinning="operationsLoading">
        <a-table :pagination="false" :data-source="operations ? operations : []" :columns="columns">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              {{ t(`operationStatus.${record.status}`) }}
            </template>
            <template v-if="column.key === 'date'">
              {{ dayjs(record.date).format(DATE_TIME_FORMAT) }}
            </template>
            <template v-if="column.key === 'summa'">
              {{ record.summa }}
            </template>
          </template>
        </a-table>
        <a-pagination v-model:current="params.page" :total="10 * lastPage" show-less-items hide-on-single-page @change="onChangePage" />
      </a-spin>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
