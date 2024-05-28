<script  setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const color = 'red'

const hours = ref(new Date().getHours())
const minutes = ref(new Date().getMinutes())
const seconds = ref(new Date().getSeconds())
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth())
const day = ref(new Date().getDate())
const weatherData = ref('')
const temperatureCelsius = ref(null)

const checkSingleDigit = digit => (`0${digit}`).slice(-2)

const setTime = () => {
  setInterval(() => {
    const date = new Date()
    hours.value = date.getHours()
    minutes.value = checkSingleDigit(date.getMinutes())

    seconds.value = checkSingleDigit(date.getSeconds())
  }, 1000)
}
const getWeather = () => {
  const apiKey = '895284fb2d2c50a520ea537456963d9c'
  const input = 'Tashkent'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
  axios
    .get(apiUrl)
    .then((response) => {
      weatherData.value = response.data
      temperatureCelsius.value = (weatherData.value.main.temp - 273.15).toFixed(2)
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  getWeather()
  setTime()
})
</script>

<template>
  <div class="main" style="height: 100vh; padding: 20px">
    <div class="flex justify-between">
      <div class="main-time">
        <h1 style="font-size: 42px; font-weight: 500; color: #FFF;">
          {{ $t('tashkent') }},  {{ $t(`${weatherData?.weather?.map(item => item?.main).join(' ')}`) }} {{ temperatureCelsius?.slice(0, 2) }} °C
        </h1>
        <h1 style="color: #FFFFFF; font-size: 64px" class="nd_p_text120">
          {{ hours }}:{{ minutes }}:{{ seconds }}
        </h1>
        <h1 style="color: #FFFFFF; font-size: 24px; text-align: end; font-weight: 500">
          <span style="border-radius: 6px; padding: 3px 6px; background: rgba(255, 255, 255, 0.12)">{{ day }}/{{ month + 1 }}/{{ year }}</span>
        </h1>
      </div>
      <div class="flex gap-14">
        <HomeNodes />
        <!--        <HomeTaskList /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main{
  background-image: url("../../assets/images/robert-linder-FDIJU4mave8-unsplash.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 0;
  position: relative;
  overflow-x: hidden;
  &-time{
    width: 35%;
    border-radius: 6px;
    background: rgba(23, 31, 38, 0.20);
    backdrop-filter: blur(20px);
    height: 100%;
    max-height: 400px;
    padding: 20px;
  }
}
</style>
