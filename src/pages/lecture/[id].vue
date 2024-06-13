<script setup lang="ts">
import { isAxiosError } from 'axios'
import { notification } from 'ant-design-vue'
import { API_FILE_URL } from '~/utils/config'
import { getProjectId } from '~/services/projects'
const loading = ref(false)
const lecture = ref<any>()
const route = useRoute()

const loadData = async () => {
  loading.value = true
  try {
    const {
      data,
    } = await getProjectId(route.params.id as string)
    lecture.value = data
  }
  catch (e) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
    }
  }
  finally {
    loading.value = false
  }
}
loadData().then()
</script>

<template>
  <div>
    <iframe
      style="width: 100%; height: 100vh"
      :src="`${API_FILE_URL}/${lecture?.files[0]?.path}#toolbar=0`"
    />
  </div>
</template>

<style scoped>

</style>
