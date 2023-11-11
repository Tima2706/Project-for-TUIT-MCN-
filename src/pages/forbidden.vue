<script setup lang="ts"></script>

<template>
  <div class="error_file">
    <VText size="100" color="#48545D" weight="600">
      403
    </VText>
    <VText size="22" color="#A2A5B9" class="mb-6">
      Страница не найдена
    </VText>
    <AButton href="/" type="primary" class="btn">
      На главную
    </AButton>
  </div>
</template>

<style scoped>
.error_file {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn {
  display: flex;
  align-items: center;
}
</style>

<route lang="yaml">
meta:
  layout: empty
</route>
