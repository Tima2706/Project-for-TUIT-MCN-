<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

import { useI18n } from 'vue-i18n'
import BankLogo from '~/assets/icons/sidebar/bank.svg'
import AngleLeftIcon from '~/assets/icons/angle-left.svg'
import UsersIcon from '~/assets/icons/sidebar/users-line.svg'
import ProfileIcon from '~/assets/icons/sidebar/profile.svg'
import ProductsIcon from '~/assets/icons/sidebar/products.svg'
import ContractIcon from '~/assets/icons/contract.svg'
import ShoppingIcon from '~/assets/icons/shopping-cart.svg'
import AcceptBasket from '~/assets/icons/sidebar/accept-basket.svg'
import Balance from '~/assets/icons/balance.svg'
import Withdraw from '~/assets/icons/sidebar/withdraw.svg'
import Blocked from '~/assets/icons/sidebar/blocked.svg'
import ErrorTransaction from '~/assets/icons/sidebar/error-transaction.svg'
import Expenses from '~/assets/icons/sidebar/expenses.svg'
import { useAccess } from '~/composables/useAccess'
import { PERMISSIONS } from '~/utils/constants'
const { t } = useI18n({ useScope: 'local' })

const collapsed = ref(false)

const { hasAccess } = useAccess()

const navigations: {
  title: string
  icon: string
  access: boolean
  to: RouteLocationRaw
}[] = [
  {
    title: t('balance'),
    icon: Balance,
    access: true,
    to: { name: 'balance' },
  },
  {
    title: t('banking'),
    icon: AcceptBasket,
    access: true,
    to: { name: 'banking' },
  },
  {
    title: t('withdraw'),
    icon: Withdraw,
    access: true,
    to: { name: 'withdraw' },
  },
  {
    title: t('blockedDeposit'),
    icon: Blocked,
    access: true,
    to: { name: 'blockedDeposit' },
  },
  {
    title: t('erroneousTransactions'),
    icon: ErrorTransaction,
    access: true,
    to: { name: 'erroneousTransactions' },
  },
   {
    title: t('expenses'),
    icon: Expenses,
    access: true,
    to: { name: 'expenses' },
  },

]
</script>

<template>
<!--  <a-layout>-->
      <AppToolbar />
    <div>
<!--    <a-layout-header>-->
<!--      <DTHeader/>-->
<!--    </a-layout-header>-->

    <button
      class="sidebar__collapse-btn"
      :class="[{ 'sidebar__collapse-btn-collapsed': collapsed }]"
      @click="collapsed = !collapsed"
    >
      <AngleLeftIcon width="10" />
    </button>
    <a-layout>
      <a-layout-sider :collapsed-width="0" :collapsed="collapsed" width="268px">
        <div class="sidebar">
          <div class="sidebar__header">
            <BankLogo />
            <p class="sidebar__title">
              {{ $t("RKP") }}
            </p>
          </div>
          <AppNavigation :items="navigations" />
        </div>
      </a-layout-sider>
      <a-layout-content class="overflow-y-auto">
        <RouterView />
      </a-layout-content>
    </a-layout>
<!--  </a-layout>-->
    </div>
</template>

<style lang="scss">
@import "../styles/layouts/defaultLayout.scss";

.transition-effect {
  &-enter-active,
  &-leave-active {
    transition: all 0.2s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
