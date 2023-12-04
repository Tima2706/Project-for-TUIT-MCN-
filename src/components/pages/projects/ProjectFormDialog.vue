<script setup lang="ts">
import {notification} from 'ant-design-vue'
import {defineExpose, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useServerError} from '~/services/useServerError'
import {
  createProject,
} from '~/services/projects'

const props = defineProps<{ attributeId: string }>()
const status = ref('done')
import {UploadOutlined} from '@ant-design/icons-vue';
import type {UploadProps} from 'ant-design-vue';


const emits = defineEmits<ProductsEmitsType>()
const group = ref<any>([])

const {t} = useI18n()
const {getFieldErrors} = useServerError()
const params = ref({
  organizationId: null,
})
const fileList = ref<any>([])


interface ProductsEmitsType {
  (e: 'update:data'): void
}

const FORM = {
  title: '',
  files: []
}
const visible = ref(false)
const submitLoading = ref(false)
const formRef = ref()
const form = ref<any>({...FORM})


watch(visible, (val) => {
  if (!val) {
    form.value = {...FORM}
  }

  setTimeout(() => {
    formRef.value?.resetForm()
  })
})
const submit = async () => {
  const validate = await formRef.value.validate()
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('type', 'practical');
  form.value.files.forEach(item => {
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
    } catch (err: any) {
      formRef.value.setErrors(getFieldErrors(err))
    } finally {
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
defineExpose({open})





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
              <VText class="pb-3">{{ $t('title') }}</VText>

              <AInput
                :placeholder="$t('name')"
                v-model:value="form.title"
              />

              <VText class="pb-3">{{ $t('value') }}</VText>
              <a-upload
                accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                @change="handleFileUpload"
                :status="status"
                :max-count="1"
                v-model:file-list="fileList"
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
      <ADivider class="my-2"/>
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
