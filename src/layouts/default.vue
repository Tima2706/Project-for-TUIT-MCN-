<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

import { useI18n } from 'vue-i18n'
import AngleLeftIcon from '~/assets/icons/angle-left.svg'
import Balance from '~/assets/icons/sidebar/play1.svg'




import Home from '~/assets/icons/sidebar/home.svg'
import Message from '~/assets/icons/message-edit.svg'
import Contract from '~/assets/icons/contract-file.svg'

import { useAccess } from '~/composables/useAccess'
const { t } = useI18n({ useScope: 'local' })

const collapsed = ref(false)


const navigations: {
  title: string
  icon: string
  access: boolean
  to: RouteLocationRaw
}[] = [
  {
    title: t('home'),
    icon: Home,
    access: true,
    to: { name: 'home' },
  },
  {
    title: t('lecture'),
    icon: Contract,
    access: true,
    to: { name: 'lecture' },
  },
  {
    title: t('practice'),
    icon: Message,
    access: true,
    to: { name: 'practice' },
  },
  {
    title: t('videoСourses'),
    icon: Balance,
    access: true,
    to: { name: 'videocourses' },
  },




]
</script>

<template>
      <AppToolbar />
    <div>
    <button
      class="sidebar__collapse-btn"
      :class="[{ 'sidebar__collapse-btn-collapsed': collapsed }]"
      @click="collapsed = !collapsed"
    >
      <AngleLeftIcon width="10" />
    </button>
    <a-layout>
      <a-layout-sider :collapsed-width="0" :collapsed="collapsed" width="268px">
        <div  class="sidebar">
          <div class="sidebar__header ">
            <p class="sidebar__title">
              {{ $t("MCN") }}
            </p>
          </div>
          <AppNavigation :items="navigations" />
        </div>
      </a-layout-sider>
      <a-layout-content class="overflow-y-auto">
        <RouterView />
      </a-layout-content>
    </a-layout>
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
