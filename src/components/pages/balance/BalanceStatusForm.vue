<script lang="ts" setup>
import { formatMoney } from "~/utils/pureFunction";
import type { TransactionBalance } from "~/services/dto/transcationBalance";
import { isBoolean } from "@vueuse/core";

interface Props {
  info: TransactionBalance;
  loading: boolean;
}
defineProps<Props>();
const showTransactionBalance = reactive({
  balance: getBalanceShowCase("balance"),
  available: getBalanceShowCase("available"),
  blocked: getBalanceShowCase("blocked"),
  outlay: getBalanceShowCase("outlay"),
});

watch(showTransactionBalance, () => {
  for (const key in showTransactionBalance) {
    if (showTransactionBalance[key]) localStorage.removeItem(key);
    else localStorage.setItem(key, showTransactionBalance[key]);
  }
});

const { t } = useI18n();

function getBalanceShowCase(str: string) {
  const balanceShowCase = localStorage.getItem(str);
  if (balanceShowCase) return false;
  else return true;
}

function handleHideAmount(str) {
  if (typeof showTransactionBalance[str] !== "undefined")
    showTransactionBalance[str] = !showTransactionBalance[str];
}
</script>

<template>
  <div class="status">
    <div v-if="info" class="status__block">
      <div class="status__item">
        <div class="abs_befor abs_bg_greey" />
        <h1>{{ t("balance") }}</h1>
        <p class="mb-1 color_greey">
          {{
            showTransactionBalance.balance
              ? formatMoney(info.balance)
              : "*** ***"
          }}
          <span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('balance')">{{
          t("hideAmount")
        }}</a>
      </div>
      <div class="status__item">
        <div class="abs_befor abs_bg_yellow" />
        <h1>{{ t("remainBalance") }}</h1>
        <p class="mb-1 color_yellow">
          {{
            showTransactionBalance.available
              ? formatMoney(info.available)
              : "*** ***"
          }}<span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('available')">{{
          t("hideAmount")
        }}</a>
      </div>
      <div class="status__item">
        <div class="abs_befor abs_bg_red" />
        <h1>{{ t("blockedBalance") }}</h1>
        <p class="mb-1 color_red">
          {{
            showTransactionBalance.blocked
              ? formatMoney(info.blocked)
              : "*** ***"
          }}<span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('blocked')">{{
          t("hideAmount")
        }}</a>
      </div>
      <div class="status__item">
        <div class="abs_befor abs_bg_black" />
        <h1>{{ t("balance") }}</h1>
        <p class="mb-1 color_black">
          {{
            showTransactionBalance.outlay
              ? formatMoney(info.outlay)
              : "*** ***"
          }}<span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('outlay')">{{
          t("hideAmount")
        }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./BalanceStatusForm";
</style>
