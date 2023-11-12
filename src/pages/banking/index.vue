<script lang="ts" setup>
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { DATE_TIME_FORMAT } from "~/utils/constants";
// import { getBanks } from '~/services/banking.js'
import { useFetchData } from "~/composables/useFetch";
import Filter from "~/assets/icons/filter.svg";
import Hashtag from "~/assets/icons/hashtag.svg";
import { getBankingType } from "~/services/transactionBalance";

const { t } = useI18n();
const isFilterOpened = ref<boolean>(false);

const value1 = ref("lucy");
const columns = [
  {
    title: t("documentNumber"),
    dataIndex: "doc_number",
    key: "doc_number",
  },
  {
    title: t("Transaction date"),
    dataIndex: "date",
    key: "date",
  },
  {
    title: t("type"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("МФО"),
    dataIndex: "organization_account",
    key: "organization_account.bank.mfo",
  },
  {
    title: t("Расчетный счет"),
    dataIndex: "organization_account",
    key: "organization_account.account",
  },
  {
    title: t("summa"),
    dataIndex: "summa",
    key: "summa",
  },
  {
    title: t("status"),
    dataIndex: "status",
    key: "status",
  },
];
const lastPage = ref(1);
const params = reactive({
  page: 1,
});
const bankFilter = ref<any>({
  note: "",
  partner_organization_id: "",
  from_summa: null,
  to_summa: null,
  from_date: "",
  to_date: "",
  doc_number: "",
  product_name: "",
});
const {
  data: banks,
  loading: bankingLoading,
  fetch,
} = useFetchData<any[]>(
  async () => {
    const {
      data: { data, last_page },
    } = await getBankingType({ ...params, ...bankFilter.value });
    lastPage.value = last_page;
    return { data };
  },
  { immediately: true }
);

const onChangeFilter = (filter: any) => {
  bankFilter.value = { ...filter };
  fetch();
};

const onChangePage = () => {
  fetch();
};
</script>

<template>
  <div>
    <VText weight="600" size="18" class="mb-4">
      {{ t("banking") }}
    </VText>
    <a-card>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <a-button
            type="primary"
            ghost
            class="flex justify-center items-center gap-2"
            @click="isFilterOpened = !isFilterOpened"
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

        <!--        <div class="flex items-center gap-2"> -->
        <!--          <span>{{ t("sort") }}</span> -->
        <!--          <a-select -->
        <!--            ref="select" -->
        <!--            v-model:value="value1" -->
        <!--            style="width: 120px" -->
        <!--            @focus="focus" -->
        <!--            @change="handleChange" -->
        <!--          > -->
        <!--            <a-select-option value="jack"> -->
        <!--              Jack -->
        <!--            </a-select-option> -->
        <!--            <a-select-option value="lucy"> -->
        <!--              Lucy -->
        <!--            </a-select-option> -->
        <!--            <a-select-option value="disabled" disabled> -->
        <!--              Disabled -->
        <!--            </a-select-option> -->
        <!--            <a-select-option value="Yiminghe"> -->
        <!--              yiminghe -->
        <!--            </a-select-option> -->
        <!--          </a-select> -->
        <!--        </div> -->
      </div>
      <transition name="transition-effect" mode="out-in">
        <BankingFilterList
          :filter="bankFilter"
          :is-filter-opened="isFilterOpened"
          @changed="onChangeFilter"
        />
      </transition>
    </a-card>
    <div>
      <a-spin :spinning="bankingLoading">
        <a-table
          class="banking-table"
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
            <template v-if="column.key === 'type'">
              {{ record.type === 5 ? "вывести" : "пополнения" }}
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

<style lang="scss">
.banking-table {
  .green:where(.css-dev-only-do-not-override-176lbft).ant-tag-green {
    color: #49c591;
    background: rgba(39, 229, 150, 0.16);
    border: none;
    padding: 5px 12px;
  }

  .red:where(.css-dev-only-do-not-override-176lbft).ant-tag-red {
    color: #ed5151;
    background: rgba(237, 81, 81, 0.16);
    border: none;
    padding: 5px 12px;
  }

  .yellow:where(.css-dev-only-do-not-override-176lbft).ant-tag-yellow {
    color: #df9300;
    background: rgba(237, 203, 81, 0.16);
    border: none;
    padding: 5px 12px;
  }
}
</style>
