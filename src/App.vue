<template>
  <AConfigProvider
    :theme="{
      token: {
        colorPrimary: '#0096B2',
      },
    }"
  >
    <RouterView />
  </AConfigProvider>
</template>
