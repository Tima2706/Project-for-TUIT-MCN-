<script setup>
const { t } = useI18n()
const loading = ref(false)
const vedioList = ref([
  {
    id: 1,
    title: 'Видео 1',
    description: 'Введение в компьютерные сети | Курс "Компьютерные сети" | Лекция 1',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/OLFA0soYGhw?list=PLtPJ9lKvJ4oiNMvYbOzCmWy6cRzYAh9B1',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 2,
    title: 'Видео 1',
    description: 'Классификация сетей | Курс "Компьютерные сети" | Лекция 2',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/Y4LK1OZ54h0?list=PLtPJ9lKvJ4oiNMvYbOzCmWy6cRzYAh9B1',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 3,
    title: 'Видео 1',
    description: 'Топологии сетей | Курс "Компьютерные сети" | Лекция 3',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/z8VmkYahV8M',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 4,
    title: 'Видео 1',
    description: 'Стандарты компьютерных сетей | Курс "Компьютерные сети" | Лекция 4',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/1dWCwQpqydU?list=PLtPJ9lKvJ4oiNMvYbOzCmWy6cRzYAh9B1',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 5,
    title: 'Видео 1',
    description: 'Основы организации компьютерных сетей | Курс "Компьютерные сети" | Лекция 5',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/EPvxn9KvBvs?list=PLtPJ9lKvJ4oiNMvYbOzCmWy6cRzYAh9B1',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 6,
    title: 'Видео 1',
    description: 'Модель OSI | Курс "Компьютерные сети" | Лекция 6',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/OLFA0soYGhw?list=PLtPJ9lKvJ4oiNMvYbOzCmWy6cRzYAh9B1',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 7,
    title: 'Видео 1',
    description: 'Модель и стек протоколов TCP/IP | Курс "Компьютерные сети" | Лекция 7',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/UZo4ffQ-aAc?list=PLtPJ9lKvJ4oiNMvYbOzCmWy6cRzYAh9B1',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 8,
    title: 'Видео 1',
    description: 'Физический уровень | Курс "Компьютерные сети" | Лекция 8',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/yIf7hrgw8P4',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
  {
    id: 8,
    title: 'Видео 1',
    description: 'Канальный уровень | Курс "Компьютерные сети" | Лекция 9',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.youtube.com/embed/OLFA0soYGhw?list=PLtPJ9lKvJ4oiNMvYbOzCmWy6cRzYAh9B1',
    duration: '00:10:00',
    views: 100,
    likes: 10,
    dislikes: 1,
    comments: 5,
    date: '2021-10-10',
  },
])
</script>

<template>
  <div class="video">
    <VText size="24" color="#48545D" weight="600" class="mb-6">
      {{ $t('videoСourses') }}
    </VText>
    <a-spin :spinning="loading">
      <div class="video__list">
        <div v-for="video in vedioList" :key="video.id" class="video__item">
          <div class="video__item-image">
            <iframe width="450" height="315" :src="video.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
          </div>
          <div class="video__item-description">
            <VText size="18" color="#48545D" weight="600" class="mb-6">
              {{ video.description }}
            </VText>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<style lang="scss" scoped>
.video {
  padding: 16px;
}

.video__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 50px;
}
.video__item {
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
