<template>
  <div style="overflow: auto" class="homes_item">
    <p style="font-weight: 600; color: #FFFFFF" class="uppercase pb-3">{{$t('MyTasks')}}</p>
    <div style="cursor: pointer"  @click="$router.push(`/dashboard/${item?.projectId}`)" v-for="item in tasksList" :key="item.id" class="my_tasks mb-3">
      <p class="nd_p_text14 nd_font_weight600 nd_text_black mb-3">{{item.name}}</p>
      <p class="nd_info_text nd_p_text12 nd_text_black mb-4">{{item.description}}</p>
      <div class="my_users mb-3">
        <div class="user_one">
          <img src="../../assets/logo.png" alt="">
        </div>
      </div>
      <div>
        <div class="info_data">
          <svg style="margin-right: 5px" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4.66669 1.16663V2.91663" stroke="#7A889B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.33331 1.16663V2.91663" stroke="#7A889B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.04169 5.30249H11.9584" stroke="#7A889B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.25 4.95829V9.91663C12.25 11.6666 11.375 12.8333 9.33333 12.8333H4.66667C2.625 12.8333 1.75 11.6666 1.75 9.91663V4.95829C1.75 3.20829 2.625 2.04163 4.66667 2.04163H9.33333C11.375 2.04163 12.25 3.20829 12.25 4.95829Z" stroke="#7A889B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.15522 7.99162H9.16046" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.15522 9.74162H9.16046" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.99739 7.99162H7.00263" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.99739 9.74162H7.00263" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.83833 7.99162H4.84357" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.83833 9.74162H4.84357" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="nd_p_text12 nd_color_grey">  {{item?.deadLine.slice(0,10)}} {{item?.deadLine.slice(12,-1)}}</p>
        </div>
        <div  style="margin-left: 8px">
          <svg style="margin-right: 5px" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4.95831 6.125H9.04165" stroke="#7A889B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.08335 10.7508H6.41669L9.01253 12.4775C9.39753 12.7342 9.91669 12.46 9.91669 11.9933V10.7508C11.6667 10.7508 12.8334 9.58415 12.8334 7.83415V4.33415C12.8334 2.58415 11.6667 1.41748 9.91669 1.41748H4.08335C2.33335 1.41748 1.16669 2.58415 1.16669 4.33415V7.83415C1.16669 9.58415 2.33335 10.7508 4.08335 10.7508Z" stroke="#7A889B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>5</p>
        </div>
        <div >
          <svg style="margin-right: 5px" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 2.91663C1.75 1.95013 2.5335 1.16663 3.5 1.16663H8.16667C10.4218 1.16663 12.25 2.9948 12.25 5.24996V11.0833C12.25 12.0498 11.4665 12.8333 10.5 12.8333H3.5C2.5335 12.8333 1.75 12.0498 1.75 11.0833V2.91663ZM7.58333 2.33329H3.5C3.17783 2.33329 2.91667 2.59446 2.91667 2.91663V11.0833C2.91667 11.4055 3.17783 11.6666 3.5 11.6666H10.5C10.8222 11.6666 11.0833 11.4055 11.0833 11.0833V5.24996H7.58333V2.33329ZM10.8406 4.08329C10.4657 3.22524 9.68994 2.58243 8.75 2.39164V4.08329H10.8406Z" fill="#7A889B"/>
          </svg>
          <p >5</p>
        </div>
        <div >
          <svg style="margin-right: 5px" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7.21582 5.18005H10.2783" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.72168 5.18005L4.15918 5.61755L5.47168 4.30505" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.21582 9.26331H10.2783" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.72168 9.26331L4.15918 9.70081L5.47168 8.38831" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.25002 12.8333H8.75002C11.6667 12.8333 12.8334 11.6666 12.8334 8.74996V5.24996C12.8334 2.33329 11.6667 1.16663 8.75002 1.16663H5.25002C2.33335 1.16663 1.16669 2.33329 1.16669 5.24996V8.74996C1.16669 11.6666 2.33335 12.8333 5.25002 12.8333Z" stroke="#7A889B" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>5</p>
        </div>
      </div>
      <div >
        <div >
          <p>Front end</p>
        </div>
        <div >
          <p>Back end</p>
        </div>
        <div >
          <p>Design</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {getTaskList} from "~/services/tasks.js";

const spinning = ref(false)
const tasksList = ref([])
const getTasks = async () => {
  spinning.value = true
  try {
    const {
      data: { data},
    } = await getTaskList()

    tasksList.value = data
  }
  catch (err) {
    console.error(err)
  }
  finally {
    spinning.value = false
  }
}
getTasks()
</script>

<style scoped>
.homes_item{
  overflow: auto;
  width: 325px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  padding: 16px;
  height: calc(100vh - 32px);
}
.my_tasks{
  border-radius: 6px;
  background: #FFF;
  padding: 14px;
}



</style>
