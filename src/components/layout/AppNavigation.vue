<script lang="ts" setup>
import { type RouteLocationRaw } from 'vue-router'

export interface Props {
  items: {
    title: string
    icon: string
    access: boolean
    to: RouteLocationRaw
  }[]
}

withDefaults(defineProps<Props>(), {
  items: () => [],
})
const route = useRoute()
</script>

<template>
  <ul class="navigation">
    <template v-for="(item, index) in items">
      <li v-if="item.access" :key="index">
        <router-link
          v-slot="data"
          :exact="false"
          :exact-path="false"
          :to="item.to"
        >
          <div :class="{ 'is-active': route.path.includes(data.href) }">
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ item.title }} </span>
          </div>
        </router-link>
      </li>
    </template>
  </ul>
</template>

<style lang="scss">
@import "../../styles/components/layout/appNavigation";
</style>
