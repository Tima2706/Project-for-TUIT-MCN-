<script lang="ts" setup="">
import { useI18n } from 'vue-i18n'
import { notification } from 'ant-design-vue'
import { isAxiosError } from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrashIcon from '~/assets/icons/trash-line.svg'
import SearchIcon from '~/assets/icons/search-line.svg'

import {
  deleteProjectId,
  getProjectList,
} from '~/services/projects'
import PlusIcon from '~/assets/icons/plus-fill.svg'
import { API_FILE_URL } from '~/utils/config'
import HashtagIcon from '~/assets/icons/hashtag.svg'
import Eyes from '~/assets/icons/eye-line.svg'
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const projects = ref<any[]>()
const organizationStore = useOrganizationStore()

const { t } = useI18n()

const columns = [
  {
    title: t('#'),
    dataIndex: 'id',
    key: 'id',
    width: '2%',

  },
  {
    title: t('subject'),
    dataIndex: 'title',
    key: 'title',
  },

  {
    title: t('actions'),
    dataIndex: 'action',
    key: 'action',
    width: '5%',
  },
]
const params = ref({
  page: 1,
  limit: 10,
  type: 'practical',
})

const filter = ref<{ query: string }>({
  query: '',
})
const ProjectFormDialogRef = ref<InstanceType<typeof ProjectFormDialog>>()

const totalItems = ref(0)

const loadData = async () => {
  loading.value = true
  try {
    const {
      data: { items, meta },
    } = await getProjectList({ ...params.value, ...filter.value })
    totalItems.value = meta.totalItems
    projects.value = items
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

const handleDelete = async (id: string) => {
  try {
    await deleteProjectId(id)
    await loadData()
    notification.success({ message: t('successDeleted') })
  }
  catch (error) {
    if (isAxiosError(error)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
    }
  }
}
const changePagination = () => {
  router.replace({ query: { ...route.query, page: params.value.page } }).then()
  loadData()
}
const changeFilter = () => {
  router.replace({ query: { ...filter.value, page: '1' } })
  params.value.page = 1
  loadData()
}
const initParams = () => {
  const { page } = route.query
  if (page)
    params.value.page = +page
}
initParams()
const downloadDocument = () => {
  if (projects.value && projects.value.length > 0) {
    const links = projects.value.map((item) => {
      if (item.files && item.files.length > 0)
        return `${API_FILE_URL}/${item.files[0].path}`

      return null
    }).filter(link => link !== null)

    if (links.length > 0) {
      links.forEach((documentUrl) => {
        const link = document.createElement('a')
        link.href = documentUrl
        link.download = 'downloaded_document'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
    else {
      console.error('No documents available for download')
    }
  }
  else {
    console.error('No projects available for download')
  }
}

const openFormDialog = (item: any) => {
  ProjectFormDialogRef.value?.open(item)
}
</script>

<template>
  <div style="padding: 16px">
    <h3 class="page-title font-semibold text-lg">
      {{ $t("practice") }}
    </h3>
    <ACard class="flex justify-between">
      <div class="flex items-center ">
        <AButton
          v-if="organizationStore?.organization?.username === 'admin'"
          type="primary"
          class="flex items-center mr-4"
          @click="$refs.ProjectFormDialogRef.open()"
        >
          <PlusIcon class="mr-2.5" />
          {{ $t("add") }}
        </AButton>
        <AInput
          v-model:value="filter.query"
          :placeholder="$t('search')"
          class="product-input"
          allow-clear
          @input="changeFilter"
        >
          <template #suffix>
            <span class="">
              <SearchIcon />
            </span>
          </template>
        </AInput>
      </div>
    </ACard>
    <ATable
      :pagination="false"
      :loading="loading"
      :data-source="projects"
      :columns="columns"
    >
      <template #emptyText>
        <EmptyText />
      </template>
      <template #bodyCell="{ column, record, index }">
        <div v-if="column.dataIndex === 'id'">
          {{ index + 1 }}
        </div>

        <div v-if="column.dataIndex === 'action'">
          <div class="action-cell items-center">
            <AButton
              size="large" type="primary"
              class="flex items-center mr-4 gap-2" @click="downloadDocument"
            >
              <HashtagIcon style="fill: none;" />
              {{ $t('download') }}
            </AButton>
            <a-popconfirm
              v-if="organizationStore?.organization?.username === 'admin'"
              :title="$t('confirmDelete')"
              :ok-text="$t('yes')"
              :cancel-text="$t('no')"
              @confirm="() => handleDelete(record.id)"
            >
              <a-button class="action-btn">
                <template #icon>
                  <TrashIcon />
                </template>
              </a-button>
            </a-popconfirm>
            <a-button
              v-if="record?.files?.some(file => file.path.endsWith('.pdf'))"
              class="action-btn"
              @click="router.push(`/practice/${record.id}`)"
            >
              <template #icon>
                <Eyes />
              </template>
            </a-button>
          </div>
        </div>
      </template>
    </ATable>
    <div class="py-6">
      <a-pagination
        v-model:current="params.page"
        :page-size="params.limit"
        :total="totalItems"
        show-less-items
        hide-on-single-page
        @change="changePagination"
      />
    </div>
    <ProjectFormDialog ref="ProjectFormDialogRef" @update:data="loadData" @saved="loadData" />
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/pages/users/index.scss";
</style>
