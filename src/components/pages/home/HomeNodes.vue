<template>
  <div class="homes_item">
    <p style="font-weight: 600; color: #FFFFFF" class="uppercase pb-3">{{ $t('Мои заметки') }}</p>
    <div v-for="(item, index) in noteList" :key="index" class="mb-2">
      <ACard @click="openFormDialog(item)">
        <div class="flex gap-2 items-center">
          <svg data-v-0851bd64="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
               fill="none">
            <path data-v-0851bd64="" d="M8 4.29333V6.51334" stroke="#13C55E" stroke-miterlimit="10"
                  stroke-linecap="round"></path>
            <path data-v-0851bd64=""
                  d="M8.01333 1.33334C5.55999 1.33334 3.57333 3.32001 3.57333 5.77334V7.17334C3.57333 7.62668 3.38666 8.30668 3.15333 8.69334L2.30666 10.1067C1.78666 10.98 2.14666 11.9533 3.10666 12.2733C6.29333 13.3333 9.73999 13.3333 12.9267 12.2733C13.8267 11.9733 14.2133 10.92 13.7267 10.1067L12.88 8.69334C12.6467 8.30668 12.46 7.62001 12.46 7.17334V5.77334C12.4533 3.33334 10.4533 1.33334 8.01333 1.33334Z"
                  stroke="#13C55E" stroke-miterlimit="10" stroke-linecap="round"></path>
            <path data-v-0851bd64=""
                  d="M10.22 12.5467C10.22 13.7667 9.22 14.7667 8 14.7667C7.39333 14.7667 6.83333 14.5133 6.43333 14.1133C6.03333 13.7133 5.78 13.1533 5.78 12.5467"
                  stroke="#13C55E" stroke-miterlimit="10"></path>
          </svg>
          <VText>{{ item.title }}</VText>
        </div>
        <VText class="flex justify-end pt-2"><span
            style="background: rgba(255,215,0,0.84); color: #FFFFFF; border-radius: 6px; font-size: 11px"
            class="p-1">{{ item.deadline ? item.deadline.slice(8, 10) : "" }} {{ $t('day') }} {{ item.deadline ? item.deadline.slice(11, 16) : "" }}</span></VText>
      </ACard>
    </div>
    <a-button style="width: 100%; background: rgba(255, 255, 255, 0.60)" class="flex justify-center items-center"
              @click="openFormDialog">
      <svg data-v-0851bd64="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path data-v-0851bd64="" fill-rule="evenodd" clip-rule="evenodd"
              d="M11.4001 4.4C11.4001 3.6268 10.7733 3 10.0001 3C9.22689 3 8.60009 3.6268 8.60009 4.4V8.60001H4.4C3.6268 8.60001 3 9.22681 3 10C3 10.7732 3.6268 11.4 4.4 11.4H8.60008V15.6C8.60008 16.3732 9.22689 17 10.0001 17C10.7733 17 11.4001 16.3732 11.4001 15.6V11.4H15.6C16.3732 11.4 17 10.7732 17 10C17 9.22681 16.3732 8.60001 15.6 8.60001H11.4001V4.4Z"
              fill="#171F26" fill-opacity="0.6"></path>
      </svg>
    </a-button>
  </div>
  <HomeNoteForm ref="HomeNoteFormRef" @update:data="loadData" @saved="loadData" />

</template>

<script setup lang="ts">
import {ref} from "vue";
import { getNoteList, } from "~/services/interfaces/note.js";
import HomeNoteForm from "~/components/pages/home/HomeNoteForm.vue";

const HomeNoteFormRef = ref<InstanceType<typeof HomeNoteForm>>()
const spinning = ref<boolean>(false)
const noteList = ref<any>([])
const open = ref<boolean>(false);

const loadData = async () => {
  spinning.value = true
  try {
    const {
      data: {items, meta},
    } = await getNoteList()
    noteList.value = items
  } catch (err) {
    console.error(err)
  } finally {
    spinning.value = false
  }
}



loadData().then()
const openFormDialog = (item: any) => {
  HomeNoteFormRef.value?.open(item)
}
</script>

<style lang="scss" scoped>
.homes_item {
  overflow: auto;
  width: 325px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  padding: 16px;
  height: calc(100vh - 100px);
}
</style>
