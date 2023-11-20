<script setup>
import PlusIcon from '~/assets/icons/plus-fill.svg'
import SearchIcon from '~/assets/icons/search-line.svg'

// defineProps<{ filter: Filter }>()
// defineEmits(['handleClickCreate', 'handleFilter'])
// interface Filter {
//   query: string
// }
</script>
<template>
  <a-card style="width: 100%">
    <h3 class="page-title py-3 pl-2 font-semibold text-lg">
      {{ $t("teams") }}
    </h3>
    <div class="flex">
      <div  class="px-2">
        <AButton
          type="primary"
          size="large"
          class="team-create-btn"
          @click="$emit('handleClickCreate')"
        >
          <PlusIcon />
          {{ $t("addUsers") }}
        </AButton>
      </div>
      <div class="px-2" style="width: 390px">
        <AInput
          placeholder="Поиск"
          class="team-search-input"
          allow-clear
          @input="$emit('handleFilter')"

        >
          <template #suffix>
            <span class="">
              <SearchIcon />
            </span>
          </template>
        </AInput>
      </div>
    </div>
  </a-card>

</template>



<style scoped lang="scss" >
.team-create-btn {
  display: flex;
  align-items: center;
  svg {
    display: inline-block;
    margin-right: 9px;
  }
}
.team-search-input {

  input {
    height: 30px !important;
  }

  &__icon {
    @apply text-primary;
  }
}
</style>
