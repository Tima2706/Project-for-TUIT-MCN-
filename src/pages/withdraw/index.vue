<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import type { FormInstance } from 'ant-design-vue'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import { useFetchData } from '~/composables/useFetch'
import {getWithdrawal} from "~/services/transactionBalance";
import WithdrawFilterList from "~/components/pages/WithdrawFilterList.vue";
import {ref} from "vue";

const { t } = useI18n()

const value1 = ref('lucy')
const expand = ref(false)
const lastPage = ref<number>(1)
const params = reactive({
  page: 1,
})
const withdrawFilter = ref<any>({
  note: '',
  partner_organization_id: '',
  from_summa: null,
  to_summa: null,
  from_date: '',
  to_date: '',
  doc_number: '',
  product_name: '',
})

const columns = [
  {
    title: t('documentNumber'),
    dataIndex: 'doc_number',
    key: 'doc_number',
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
  {
    title: t('status'),
    dataIndex: 'status',
    key: 'status',
  },
]


const {
  data: banks,
  loading: bankingLoading,
  fetch,
} = useFetchData<any[]>(
  async () => {
    const {
      data: { data, last_page },
    } = await getWithdrawal({...params, ...withdrawFilter})
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
      {{ t("withdraw") }}
    </VText>
    <WithdrawFilterList  />
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
            <template v-if="column.key === 'organization_account.account'">
              {{ record.organization_account.account }}
            </template>
            <template v-if="column.key === 'date'">
              {{ dayjs(record.date).format(DATE_TIME_FORMAT) }}
            </template>
            <template v-if="column.key === 'summa'">
              {{ record.summa }}
            </template>
            <template v-if="column.key === 'status'">
              <span>
                <a-tag v-show="record.status === 1" color="green" class="green">
                  {{ t("operationStatus.1") }}
                </a-tag>
                <a-tag v-show="record.status === 2" color="green" class="green">
                  {{ t("operationStatus.2") }}
                </a-tag>
                <a-tag v-show="record.status === 3" color="green" class="green">
                  {{ t("operationStatus.3") }}
                </a-tag>
                <a-tag v-show="record.status === 33" color="red" class="red">
                  {{ t("operationStatus.33") }}
                </a-tag>
                <a-tag
                    v-show="record.status === 22"
                    color="yellow"
                    class="yellow"
                >
                  {{ t("operationStatus.2") }}
                </a-tag>
                <a-tag v-show="record.status === 7" color="green" class="green">
                  {{ t("operationStatus.7") }}
                </a-tag>
              </span>
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
