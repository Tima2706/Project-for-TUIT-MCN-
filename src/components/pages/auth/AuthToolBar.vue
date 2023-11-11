<script setup>
import { ref } from 'vue'
import { DT_HUB_URL } from '~/utils/constants'
import DTHeader from "@shohrux_saidov/dt-header"
import "@shohrux_saidov/dt-header/dist/style.css"

const isMoreMenu = ref(false)
</script>

<template>
  <DTHeader/>
<!--  <div class="max-h-[128px] relative">-->
<!--    <div-->
<!--      class="dark:bg-[#2B3746] px-5 md:block hidden z-20 relative"-->
<!--      data-aos="fade-down"-->
<!--      data-aos-easing="linear"-->
<!--      data-aos-offset="0"-->
<!--      data-aos-delay="500"-->
<!--    >-->
<!--      <div class="container flex mx-auto">-->
<!--        <div class="flex items-center">-->
<!--          <a :href="DT_HUB_URL"><img width="50" src="/logo.svg" alt=""></a>-->
<!--        </div>-->
<!--        <div class="flex flex-col items-center relative flex-grow">-->
<!--          <nav class="flex items-center flex-wrap justify-center w-full max-w-[1200px] gap-8 min-h-[48px]">-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="http://cabinet.dt.uz"-->
<!--            >Kabinet</a>-->
<!--            <a-->
<!--              class="dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9]"-->
<!--              href="https://market.dt.uz"-->
<!--            >Market</a>-->
<!--            <a-->
<!--              class="dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9]"-->
<!--              href="https://findoc.dt.uz"-->
<!--            >FinDoc</a>-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="https://wms.dt.uz"-->
<!--            >WMS</a>-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="https://rkp.dt.uz"-->
<!--            >RKP</a>-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="https://bank.dt.uz"-->
<!--            >Banking</a>-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="https://accounting.dt.uz"-->
<!--            >DT Accounting</a>-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="https://logistic.dt.uz/"-->
<!--            >Logistika</a>-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="https://pmo.dt.uz/"-->
<!--            >PMO</a>-->
<!--            <a-->
<!--              class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--              href="https://etm.dt.uz"-->
<!--            >ETM</a>-->
<!--            <span-->
<!--              class="p-1 cursor-pointer ease-in-out duration-300"-->
<!--              :class="{ 'rotate-180': isMoreMenu }"-->
<!--              @click="isMoreMenu = !isMoreMenu"-->
<!--            >-->
<!--              <svg class="dark:[&>path]:fill-[white]" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path d="M8.12081 0.9832L4.99597 4.07659L1.87114 0.9832C1.55705 0.672267 1.04966 0.672267 0.735571 0.9832C0.421476 1.29413 0.421476 1.79641 0.735571 2.10735L4.43222 5.7668C4.74631 6.07773 5.25369 6.07773 5.56779 5.7668L9.26443 2.10735C9.57852 1.79641 9.57852 1.29413 9.26443 0.9832C8.95034 0.680239 8.4349 0.672267 8.12081 0.9832Z" fill="#a2a5b9" />-->
<!--              </svg>-->
<!--            </span>-->
<!--          </nav>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <transition name="transition-effect" mode="out-in">-->
<!--      &lt;!&ndash;        class="dark:bg-[#2B3746] pt-6 flex justify-center absolute scale-100 translate-y-0 z-10 w-full h-full ease-in-out duration-300" &ndash;&gt;-->
<!--      &lt;!&ndash;        :class="{'z-[-1] invisible translate-y-[-5px] scale-0': !isMoreMenu}" &ndash;&gt;-->
<!--      <div-->
<!--        v-if="isMoreMenu"-->
<!--        class="bg-[#2B3746] pt-6 pb-16 flex z-10 justify-center absolute w-full h-full"-->
<!--      >-->
<!--        <div class="w-[55px]" />-->
<!--        <nav-->
<!--          class="login-sub-menu flex items-center flex-wrap w-full max-w-[820px] gap-x-8 min-h-[20px]"-->
<!--        >-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://hr.dt.uz"-->
<!--          >HR</a>-->
<!--          <a-->
<!--            class="dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9]"-->
<!--            href="https://cc.dt.uz"-->
<!--          >CallCenter</a>-->
<!--          <a-->
<!--            class="dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9]"-->
<!--            href="https://edo.dt.uz"-->
<!--          >EDM</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://meet.dt.uz"-->
<!--          >DT Meet</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://chat.dt.uz"-->
<!--          >DT Messenger</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://xarid.dt.uz"-->
<!--          >DTG Xarid</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://consult.dt.uz"-->
<!--          >DT Consulting</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://sms.dt.uz"-->
<!--          >SMS</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://edu.dt.uz/"-->
<!--          >Education</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://clinic.dt.uz/"-->
<!--          >MedClinic</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://hosting.dt.uz"-->
<!--          >Cloud Hosting</a>-->
<!--          <a-->
<!--            class="text-lightText dark:text-white hover:!text-cyan-400 text-sm !text-[#a2a5b9] font-medium"-->
<!--            href="https://backup.dt.uz/"-->
<!--          >Cloud Backup</a>-->
<!--        </nav>-->
<!--      </div>-->
<!--    </transition>-->
<!--  </div>-->
</template>

<style lang='scss'>
.login-sub-menu {
  a {
    padding-bottom: 15px;
  }
}
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
