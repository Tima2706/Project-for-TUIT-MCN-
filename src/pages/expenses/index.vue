<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import { getBanks } from '~/services/banking.js'
import { useFetchData } from '~/composables/useFetch'
import Filter from '~/assets/icons/filter.svg'
import Hashtag from '~/assets/icons/hashtag.svg'

const { t } = useI18n()

const value1 = ref('lucy')
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
const lastPage = ref<number>(1)
const params = reactive({
  organization_id: '4638d424-6345-4e87-b6d6-72c4f76f935b',
  type: 5,
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
    } = await getBanks(params, '4638d424-6345-4e87-b6d6-72c4f76f935b')
    lastPage.value = last_page
    return { data }
  },
  { immediately: true },
)

const onChangePage = () => {
  fetch()
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}
</script>

<template>
  <div>
    <VText weight="600" size="18" class="mb-4">
      {{ t("expenses") }}
    </VText>
    <a-card>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <a-button
            type="primary"
            ghost
            class="flex justify-center items-center gap-2"
          >
            <Filter />
            {{ t("filter") }}
          </a-button>
          <a-button
            type="primary"
            ghost
            class="flex justify-center items-center gap-2"
          >
            <Hashtag />
            {{ t("exportToExel") }}
          </a-button>
        </div>
        <div class="flex items-center gap-2">
          <span>{{ t("sort") }}</span>
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 120px"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </div>
      </div>
    </a-card>
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
                <a-tag color="green">
                  {{ record.status }}
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
