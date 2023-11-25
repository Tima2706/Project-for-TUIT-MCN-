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
import {getTeamList} from "~/services/teamsDTM";
import dayjs from "dayjs";
const props = defineProps<{ attributeId: string }>()

const emits = defineEmits<ProductsEmitsType>()
const employees = ref<any>([])
const group = ref<any>([])

const { t } = useI18n()
const { getFieldErrors } = useServerError()
const params = ref({
  organizationId: null,
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
  projectType: 'KANBAN',
  group: {
    id: null
  },
  manager: {
    id: null
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
const formNew = ref('')
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
  }
  catch (err) {
    console.error(err)
  }
  finally {
    spinning.value = false
  }
}
const getGroup = async () => {
  spinning.value = true
  const reqParams: Record<string, any> = {
    ...params.value,
  }
  if (reqParams.status === 'All')
    reqParams.status = null
  try {
    const {
      data: { data},
    } = await getTeamList(reqParams)

    group.value = data
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
  const deadLine = dayjs(form.value.deadLine).format('YYYY-MM-DD')

  if (validate && validate.valid) {
    submitLoading.value = true
    const { id } = form.value
    try {
      if (id)
        await updateProject( { ...form.value, deadLine })
      else await createProject({ ...form.value, deadLine })

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
const getCheckedEmployeesOptions = computed(() => {
  return employees.value
      .map((employee) => ({lastName:employee.lastName , label: employee.firstName, value: employee.id , role: employee.roles.map(item => item.roleName)}));
});
const open = (item: any) => {
  if (item) {
    form.value = {
      name: item.name,
      id: item.id,
      codeName: item.codeName,
      projectType: item.projectType,
      group: item.group,
      manager: item.manager,
      uuid: item.uuid,
      deadLine: item.deadLine ? dayjs(item.deadLine) : null

    }

    if (item.icon)
      images.value.push({ url: `${IMAGE_URL.value}/${item.icon}` })
  }
  visible.value = true
}
fetchData()
getGroup()
defineExpose({ open })


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
                  name="name"
                  rules="required"
                >
                  <AInput
                    :placeholder="$t('name')"
                    v-model:value="form.name"
                    :class="{ 'has-error': errors.length }"
                  />
                  <div class="helper-message">
                    <ErrorMessage name="name" />
                  </div>
                </Field>
                <Field
                  v-slot="{ errors }"
                  :model-value="form.codeName"
                  name="code_Name"
                  rules="required"
                >
                  <AInput
                    :placeholder="$t('codeName')"
                    v-model:value="form.codeName"
                    :class="{ 'has-error': errors.length }"
                  />
                  <div class="helper-message">
                    <ErrorMessage name="code_Name" />
                  </div>
                </Field>
                <a-select
                  v-model:value="form.group.id"
                  class="mb-4"
                  :options="group"
                  :field-names="{label: 'name', value: 'id'}"
                  style="width: 100%"
                  placeholder="select Team"
               />
                <a-select
                    v-model:value="form.manager.id"
                    style="width: 100%"
                    placeholder="select Manager"
                >
                  <ASelectOption
                      v-for="item in getCheckedEmployeesOptions"
                      :key="item.value"
                      :value="item.id"
                  >
                    {{item.label + ' ' + item.lastName}}
                  </ASelectOption>
                </a-select>
                <VText>Deadline</VText>
                <a-date-picker v-model:value="form.deadLine" />
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
