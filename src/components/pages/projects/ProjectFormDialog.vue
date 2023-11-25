<script setup lang="ts">
import { notification } from 'ant-design-vue'
import { defineExpose, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServerError } from '~/services/useServerError'
import {
  createProject,
  updateProject,
} from '~/services/projects'
import { API_FILE_URL } from '~/utils/config'
import {getEmployee} from "~/services/employees";

const props = defineProps<{ attributeId: string }>()

const emits = defineEmits<ProductsEmitsType>()
const employees = ref<any>([])
const { t } = useI18n()
const checkboxAllChecked = ref(false)
const { getFieldErrors } = useServerError()
const params = ref({
  page: 0,
  perPage: 20,
  sortBy: 'id',
  sortDirection: 'desc',
  allSearch: null,
  groupId: null,
  managerId: null,
  projectKanban: null,
  projectTrello: null,
})
const employee = ref({
  isManager: true
})
interface ProductsEmitsType {
  (e: 'update:data'): void
}

const FORM = {
  name: '',
  codeName: '',
  projectType: '',
  group: {
    id: 0
  },
  manager: {
    id: 0
  },
  uuid: null,
  deadLine: null
}
const spinning = ref(false)
const visible = ref(false)
const submitLoading = ref(false)
const formRef = ref()
const form = ref<any>({ ...FORM })
const images = ref<Array<{ url: string }>>([])

const IMAGE_URL = computed(() => API_FILE_URL)

const fetchData = async () => {
  spinning.value = true
  const reqParams: Record<string, any> = {
    ...employee.value,
  }
  if (reqParams.status === 'All')
    reqParams.status = null
  try {
    const {
      data: { data},
    } = await getEmployee(reqParams)

    employees.value = data
    // measure.value = items
    // total.value = meta?.totalItems || 0
  }
  catch (err) {
    console.error(err)
  }
  finally {
    spinning.value = false
  }
}


watch(visible, (val) => {
  if (!val) {
    form.value = { ...FORM }
    images.value = []
  }

  setTimeout(() => {
    formRef.value?.resetForm()
  })
})
const submit = async () => {
  const validate = await formRef.value.validate()
  if (validate && validate.valid) {
    submitLoading.value = true
    const { id } = form.value
    try {
      if (id)
        await updateProject(id, { ...form.value })
      else await createProject({ ...form.value })

      notification.success({
        message: t('successfully'),
        description: t('successfullySaved'),
      })
      emits('update:data')
      visible.value = false
    }
    catch (err: any) {
      formRef.value.setErrors(getFieldErrors(err))
    }
    finally {
      submitLoading.value = false
    }
  }
}


const close = () => {
  visible.value = false
}
const toggleCheckboxAll = () => {
  form.value.userIds = checkboxAllChecked ? employees.value.map(item => {
    return {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      middleName: item.middleName
    }
  }) : [];
};
const getCheckedEmployeesOptions = computed(() => {
  return employees.value
      // .filter((employee) => (form.value.userIds || []).includes(employee.id))
      .filter((employee) => form.value?.userIds?.some((user) => user.id === employee.id))
      .map((employee) => ({lastName:employee.lastName , label: employee.firstName, value: employee.id , role: employee.roles.map(item => item.roleName)}));
});
const open = (item: any) => {
  if (item) {
    form.value = {
      name: item.name,
      organizationId: item.organizationId,
      userIds: item.userIds,
      watcher: item.watcher,
      id: item.id,
    }

    if (item.icon)
      images.value.push({ url: `${IMAGE_URL.value}/${item.icon}` })
  }
  visible.value = true
}
fetchData()
defineExpose({ open })
const handleParams = (type, val) => {
  switch (type) {
    case 'search':
      params.value.allSearch = val ? val : null;
      break;

    case 'page':
      params.value.page= val - 1;
      break;
  }

  if (type !== 'page') {
    params.value.page = 0;
  }
  fetchData()

  // this.getUserAll();
};

</script>

<template>
  <a-modal
      v-model:visible="visible"
      :title="
      form.id
        ? `Edit`
        : `${$t('add')} ${$t('project')}`
    "
      width="600px"
      :footer="false"
  >
    <Form ref="formRef">
      <ARow :gutter="[8, 0]">
        <ACol :span="24">
            <div class="flex">
              <div style="width: 50%;" class="pr-4">
                <VText class="pb-3">{{$t('users')}}</VText>
                <Field
                  v-slot="{ errors }"
                  :model-value="form.name"
                  name="name_ru"
                  rules="required"
                >
                  <AInput
                    :placeholder="$t('name')"
                    v-model:value="form.name"
                    :class="{ 'has-error': errors.length }"
                  />
                  <div class="helper-message">
                    <ErrorMessage name="name_ru" />
                  </div>
                </Field>

                <AInput
                    :placeholder="$t('name')"
                    label-class="d-none"
                    :value="params.allSearch"
                    @update:value="handleParams('search', $event)"
                />
                <a-select
                    v-model:value="form.leaderId"
                    style="width: 100%"
                    :field-names="{ label: 'label', value: 'value' }"
                    placeholder="Select team leader"
                >
                  <ASelectOption
                      v-for="item in getCheckedEmployeesOptions"
                      :key="item.value"
                      :value="item.label + ' ' + item.lastName"
                  >
                  </ASelectOption>
                </a-select>
              </div>
            </div>
        </ACol>
      </ARow>
      <ADivider class="my-2" />
      <div class="flex justify-end">
        <a-button class="mr-2" @click="close">
          {{ $t("cancel") }}
        </a-button>
        <a-button
            :loading="submitLoading"
            type="primary"
            html-type="submit"
            @click.prevent="submit"
        >
          {{ $t("save") }}
        </a-button>
      </div>
    </Form>
  </a-modal>
</template>

<style scoped>

</style>
