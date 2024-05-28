<script setup lang="ts">
import { notification } from 'ant-design-vue'
import { defineExpose, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { UploadOutlined } from '@ant-design/icons-vue'
import { useServerError } from '~/services/useServerError'
import {
  createProject,
} from '~/services/projects'

const props = defineProps<{ attributeId: string }>()
const emits = defineEmits<ProductsEmitsType>()

const status = ref('done')

const group = ref<any>([])

const { t } = useI18n()
const { getFieldErrors } = useServerError()
const params = ref({
  organizationId: null,
})
const fileList = ref<any>([])

interface ProductsEmitsType {
  (e: 'update:data'): void
}

const FORM = {
  title: '',
  files: [],
}
const visible = ref(false)
const submitLoading = ref(false)
const formRef = ref()
const form = ref<any>({ ...FORM })

watch(visible, (val) => {
  if (!val)
    form.value = { ...FORM }

  else

    formRef.value?.resetForm()
})
const submit = async () => {
  const validate = await formRef.value.validate()
  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('type', 'lecture')

  form.value.files.forEach((item) => {
    formData.append('files', item)
  })

  if (validate && validate.valid) {
    submitLoading.value = true

    try {
      await createProject(formData)

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
const handleFileUpload = (val) => {
  form.value.files = [val.file.originFileObj]
  fileList.value[0].status = 'done'
}

const close = () => {
  visible.value = false
}

const open = (item: any) => {
  if (item) {
    form.value = {
      title: item.title,
      type: item.type,
      files: item.files,
      id: item.id,
    }
  }
  visible.value = true
}
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
          <div class="pr-4">
            <VText class="pb-3">
              {{ $t('subject') }}
            </VText>

            <AInput
              v-model:value="form.title"
              :placeholder="$t('name')"
            />

            <a-upload
              v-model:file-list="fileList" class="my-4"
              style="display: flex; justify-content: end; align-items: center"
              accept=".doc,.docx, ppt, pptx, .xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              :status="status"
              :max-count="1"
              @change="handleFileUpload"
            >
              <a-button>
                <UploadOutlined />
                Upload
              </a-button>
            </a-upload>
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
