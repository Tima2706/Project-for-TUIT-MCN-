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
const props = defineProps<{ attributeId: string }>()
const status = ref('done')
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';
const fileList = ref<UploadProps['fileList']>();

const emits = defineEmits<ProductsEmitsType>()
const group = ref<any>([])

const { t } = useI18n()
const { getFieldErrors } = useServerError()
const params = ref({
  organizationId: null,
})


interface ProductsEmitsType {
  (e: 'update:data'): void
}

const FORM = {
  type: 'practical',
  title: '',
  files: ''
}
const visible = ref(false)
const submitLoading = ref(false)
const formRef = ref()
const form = ref<any>({ ...FORM })
const images = ref<Array<{ url: string }>>([])
const IMAGE_URL = computed(() => API_FILE_URL)


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
        await updateProject( { ...form.value,  })
      else await createProject({ ...form.value,  })

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

const open = (item: any) => {
  if (item) {
    form.value = {
      title: item.title,
      type: item.type,
      files: item.files,
      id: item.id,
    }
    if (item.icon)
      images.value.push({ url: `${IMAGE_URL.value}/${item.icon}` })
  }
  visible.value = true
}
defineExpose({ open })

const formData = new FormData()

// formData.append('title','fsadfs')
// formData.append('files','')
const beforeUpload = (val: any) => {
  form.value.files = val.file
  setTimeout(() => {
    if (fileList.value?.length)
      fileList.value[0].status = 'done'
  }, 1000)
}


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
                <VText class="pb-3">{{$t('title')}}</VText>

                  <AInput
                    :placeholder="$t('name')"
                    v-model:value="form.title"
                  />

                <VText class="pb-3">{{$t('value')}}</VText>
                <a-upload v-model:file-list="fileList"
                          accept="file/doc, file/docx"
                          list-type="picture"
                          :custom-request="beforeUpload"
                          :status="status"
                          :max-count="1"
                >
                  <a-button>
                    <upload-outlined></upload-outlined>
                    Upload
                  </a-button>
                </a-upload>
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
