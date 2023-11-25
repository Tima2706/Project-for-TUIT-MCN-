<template>
  <div class="main" style="height: 100vh">
    <div class="flex justify-between">
    <div >
          <h1 style="font-size: 24px; font-weight: 500">
<!--            {{weatherData?.weather[0]?.main}} {{temperatureCelsius?.slice(0,2)}} °C-->
          </h1>
          <p class="nd_p_text120">{{ hours }}:{{ minutes }}</p>
<!--          <MotivationList />-->
        </div>
      <div class="flex gap-14 m-3">
      <HomeNodes/>
    <HomeTaskList/>
      </div>
    </div>

  </div>
</template>

<script  setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import HomeModes from "~/components/pages/home/HomeNodes.vue";
import HomeTaskList from "~/components/pages/home/HomeTaskList.vue";

const color = 'red';

const hours = ref(new Date().getHours());
const minutes = ref(new Date().getMinutes());
const seconds = ref(new Date().getSeconds());
const weatherData = ref('');
const temperatureCelsius = ref(0);

const checkSingleDigit = (digit) => ('0' + digit).slice(-2);

const setTime = () => {
  setInterval(() => {
    const date = new Date();
    hours.value = date.getHours();
    minutes.value = checkSingleDigit(date.getMinutes());
    seconds.value = checkSingleDigit(date.getSeconds());
  }, 1000);
};
const getWeather = () => {
  const apiKey = '895284fb2d2c50a520ea537456963d9c';
  const input = 'Tashkent';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;
  axios
    .get(apiUrl)
    .then((response) => {
      weatherData.value = response.data;
      temperatureCelsius.value = (weatherData.value.main.temp - 273.15).toFixed(2);
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  getWeather();
  setTime();
});
</script>

<style lang="scss" scoped>

.main{
  background-image: url("../../assets/images/eren.png");
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 0;
  position: relative;
  overflow-x: hidden;
}
</style>
