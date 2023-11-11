<script lang="ts" setup>
// import AuthToolBar from '~/components/pages/auth/AuthToolBar.vue'
import DTHeader from '@shohrux_saidov/dt-header'
import '@shohrux_saidov/dt-header/dist/style.css'
</script>

<template>
  <a-layout>
    <!--    <a-layout-header class="px-0">-->
    <!--      <div class="ant-layout-header__inner"> -->
    <!--        <div class="logo"> -->
    <!--      <a :href="DT_HUB_URL"><img src="/logo.svg" alt=""></a> -->
    <!--        </div> -->
    <!--        <nav class="nav"> -->
    <!--          <a :href="MARKETPLACE_URL">Market</a> -->
    <!--          <a href="https://cabinet.dt.uz/">EDO</a> -->
    <!--          <a :href="WAREHOUSE_URL">WMS</a> -->
    <!--          <a :href="LOGISTIC_URL">Logistika</a> -->
    <!--          <a :href="CALL_CENTER_URL">Call-Center</a> -->
    <!--        </nav> -->
    <!--        &lt;!&ndash;        <div class="action"> &ndash;&gt; -->
    <!--        &lt;!&ndash;          <a-dropdown :trigger="['click']"> &ndash;&gt; -->
    <!--        &lt;!&ndash;            <p class="dropdown-trigger"> &ndash;&gt; -->
    <!--        &lt;!&ndash;              Русский &ndash;&gt; -->
    <!--        &lt;!&ndash;              <AngleDownIcon /> &ndash;&gt; -->
    <!--        &lt;!&ndash;            </p> &ndash;&gt; -->
    <!--        &lt;!&ndash;            <template #overlay> &ndash;&gt; -->
    <!--        &lt;!&ndash;              <a-menu> &ndash;&gt; -->
    <!--        &lt;!&ndash;                <a-menu-item> &ndash;&gt; -->
    <!--        &lt;!&ndash;                  <a href="javascript:;">1st menu item</a> &ndash;&gt; -->
    <!--        &lt;!&ndash;                </a-menu-item> &ndash;&gt; -->
    <!--        &lt;!&ndash;                <a-menu-item> &ndash;&gt; -->
    <!--        &lt;!&ndash;                  <a href="javascript:;">2nd menu item</a> &ndash;&gt; -->
    <!--        &lt;!&ndash;                </a-menu-item> &ndash;&gt; -->
    <!--        &lt;!&ndash;                <a-menu-item> &ndash;&gt; -->
    <!--        &lt;!&ndash;                  <a href="javascript:;">3rd menu item</a> &ndash;&gt; -->
    <!--        &lt;!&ndash;                </a-menu-item> &ndash;&gt; -->
    <!--        &lt;!&ndash;              </a-menu> &ndash;&gt; -->
    <!--        &lt;!&ndash;            </template> &ndash;&gt; -->
    <!--        &lt;!&ndash;          </a-dropdown> &ndash;&gt; -->
    <!--        &lt;!&ndash;        </div> &ndash;&gt; -->
    <!--      </div> -->
    <!--      <AuthToolBar />-->
    <DTHeader/>
    <!--    </a-layout-header>-->
    <a-layout-content>
      <RouterView/>
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
@import "../styles/layouts/authLayout.scss";
</style>
