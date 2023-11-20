<script setup>


const columns = [
  {
    title: t('name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
  },
]

</script>

<template>
  <div>
    <TeamTableTopBar :filter="filter" @handle-filter="changeFilter"
                     @handle-click-create="handleClickCreateUserBtn"
    />
  </div>
</template>


<style lang="scss" scoped>

</style>
