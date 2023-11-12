<script lang="ts" setup>
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import BalanceStatusForm from '~/components/pages/balance/BalanceStatusForm.vue'
import { useFetchData } from '~/composables/useFetch'
import type { TransactionBalance } from '~/services/dto/transcationBalance'
import { getOperations, getTransactionBalance } from '~/services/transactionBalance'
import HashtagIcon from '~/assets/icons/hashtag.svg'
import FilterIcon from '~/assets/icons/filter.svg'
import {ref, reactive, onMounted} from "vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isFilterOpened = ref<boolean>(false)
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
const lastPage = ref(1)
const bankFilter = reactive<any>({
  note: '',
  partner_organization_id: '',
  from_summa: null,
  to_summa: null,
  from_date: '',
  to_date: '',
  doc_number: '',
  product_name: '',
})
const params = reactive({
  page: 1,
})

const { data: transactionBalance, loading: transactionBalanceLoading } = useFetchData<TransactionBalance>(async () => {
  const { data } = await getTransactionBalance({...bankFilter})
  return { data }
}, { immediately: true })

const { data: operations, loading: operationsLoading, fetch } = useFetchData<any[]>(async () => {
  const { data: { data, last_page } } = await getOperations({ ...params })
  lastPage.value = last_page
  return { data }
}, { immediately: true })

const onChangeFilter = (filter: any) => {
  bankFilter.value = {...filter}
}

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
      <ACard>
          <div class="flex items-center justify-between">
              <VText weight="600" size="18">
                  {{ t("operations") }}
              </VText>
              <div class="flex gap-2 items-cente">
              <AButton size="large" class="filter_btn "  @click="isFilterOpened = !isFilterOpened">
                  <FilterIcon />
                  {{ $t('filter') }}
              </AButton>
              <AButton  size="large" class="filter_btn ml-4" >
                  <HashtagIcon style="fill: none;" />
                  {{ $t('exportToExel') }}
              </AButton>
              </div>
          </div>
        <transition name="transition-effect" mode="out-in">
          <BalanceFilterList :filter="bankFilter" @changed="onChangeFilter" :isFilterOpened="isFilterOpened" />
        </transition>
      </ACard>
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

<style lang="scss" scoped>
@import '../../styles/pages/contract/index.scss';

.transition-effect {
  &-enter-active,
  &-leave-active {
    transition: all 0.4s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
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
