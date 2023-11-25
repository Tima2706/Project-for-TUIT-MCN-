<script lang="ts" setup="">
import { useI18n } from 'vue-i18n'
import { notification } from 'ant-design-vue'
import { isAxiosError } from 'axios'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PenIcon from '~/assets/icons/pen-line.svg'
import TrashIcon from '~/assets/icons/trash-line.svg'
import {
  getProjectList,
  deleteProjectId
} from '~/services/projects'
import { API_FILE_URL } from '~/utils/config'
import { PERMISSIONS } from '~/utils/constants'
import { useAccess } from '~/composables/useAccess'
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const { hasAccess } = useAccess()
const projects = ref<any[]>()

const { t } = useI18n()

const columns = [
  {
    title: t('#'),
    dataIndex: 'id',
    key: 'id',
    width: '2%',

  },
  {
    title: t('name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('team'),
    dataIndex: 'team',
    key: 'team',
  },
  {
    title: t('manager'),
    dataIndex: 'manager',
    key: 'manager',
  },
  {
    title: t('percent'),
    dataIndex: 'percent',
    key: 'percent',
  },
  {
    title: t('projectType'),
    dataIndex: 'projectType',
    key: 'projectType',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    width: '50%',
    width: '5%',
  },
]
const params = ref({
  page: 1,
  limit: 10,
})

const filter = ref<{ query: string }>({
  query: '',
})
const ProjectFormDialogRef = ref<InstanceType<typeof ProjectFormDialog>>()
const IMAGE_URL = computed(() => API_FILE_URL)
const handleClickCreateUserBtn = () => {
  ProjectFormDialogRef.value?.open()
}

const totalItems = ref(0)
const loadData = async () => {
  loading.value = true
  try {
    const {
      data: { data },
    } = await getProjectList({ ...params.value, ...filter.value })
    // totalItems.value = meta.totalItems
    projects.value = data
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

const openFormDialog = (item: any) => {
  ProjectFormDialogRef.value?.open(item)
}
</script>

<template>
  <div>
    <h3 class="page-title font-semibold text-lg">
      {{ $t("projects") }}
    </h3>

    <ProjectTableTopBar
        :filter="filter"
        @handle-filter="changeFilter"
        @handle-click-create="handleClickCreateUserBtn"
    />
    <ATable
        :pagination="false"
        :loading="loading"
        :data-source="projects"
        :columns="columns"
    >
      <template #emptyText>
        <EmptyText />
      </template>
      <template #bodyCell="{ column, record }">
        <div  v-if="column.dataIndex === 'id'">
          {{  1 }}
        </div>
        <div  v-if="column.dataIndex === 'team'">
          {{ record.group.name }}
        </div>
        <div  v-if="column.dataIndex === 'manager'">
          {{ record.manager.lastName }}  {{ record.manager.firstName }}  {{ record.manager.middleName }}
        </div>
        <div  v-if="column.dataIndex === 'percent'">
         {{record.percent ? record.percent : 0 + '%'}}
        </div>
        <div  v-if="column.dataIndex === 'projectType'">
         {{record.projectType.value}}
        </div>
        <div v-if="column.dataIndex === 'action'">
          <div class="action-cell">
            <a-button
                v-if="hasAccess(PERMISSIONS.EMPLOYEE_UPDATE)"
                class="action-btn"
                @click="openFormDialog(record)"
            >
              <template #icon>
                <PenIcon />
              </template>
            </a-button>
            <a-popconfirm
                v-if="hasAccess(PERMISSIONS.EMPLOYEE_DELETE)"
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
