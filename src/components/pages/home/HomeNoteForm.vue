<template>
  <a-modal
      v-model:visible="visible"
      :title="
      form.id
        ? `Edit`
        : `${$t('add')} ${$t('заметку')}`
    "
      width="600px"
      :footer="false"
  >
    <Form ref="formRef">
      <ARow :gutter="[8, 0]">
        <ACol :span="24">
          <Field
              v-slot="{ errors }"
              :model-value="form.title"
              name="title"
              rules="required"
          >
            <AInput
                :placeholder="$t('name')"
                v-model:value="form.title"
                :class="{ 'has-error': errors.length }"
            />
            <div class="helper-message">
              <ErrorMessage name="title"/>
            </div>
          </Field>
          <Field
              v-slot="{ errors }"
              :model-value="form.description"
              name="description"
              rules="required"
          >
            <ATextarea
                :placeholder="$t('name')"
                v-model:value="form.description"
                :class="{ 'has-error': errors.length }"
            />
            <div class="helper-message">
              <ErrorMessage name="description"/>
            </div>
          </Field>

          <a-date-picker v-model:value="form.deadline"  show-time placeholder="Select Time" />

        </ACol>
        <ACol :span="24">

        </ACol>
      </ARow>
      <ADivider class="my-2"/>
      <div v-if="form.id"  class="flex justify-end">
        <a-button danger class="mr-2" @click="handleDelete(form.id)">
          {{ $t("delete") }}
        </a-button>
        <a-button
            :loading="submitLoading"
            ghost
            type="primary"
            html-type="submit"
            @click.prevent="submit"
        >
          {{ $t("save") }}
        </a-button>
      </div>
      <div v-else>
        <a-button
            :loading="submitLoading"
            ghost
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

<script setup lang="ts">
import {createNote, deleteNoteId, updateNote} from "~/services/interfaces/note";
import {notification} from "ant-design-vue";
import {defineExpose, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import dayjs from "dayjs";

const {t} = useI18n()
const visible = ref(false)
const emits = defineEmits<ProductsEmitsType>()
const submitLoading = ref<boolean>(false)
const formRef = ref()
const FORM = {
  id: '',
  deadline: null,
  description: '',
  title: '',
}
const form = ref<any>({...FORM})

interface ProductsEmitsType {
  (e: 'update:data'): void
}



const submit = async () => {
  const validate = await formRef.value.validate()
  if (validate && validate.valid) {
    submitLoading.value = true
    const {id} = form.value
    try {

      if (id)
        await updateNote( {...form.value})
      else await createNote({...form.value})

      notification.success({
        message: t('successfully'),
        description: t('successfullySaved'),
      })
      emits('update:data')
      visible.value = false

    } catch (err: any) {
      formRef.value.setErrors(err)
    } finally {
      submitLoading.value = false
    }
  }
}
watch(visible, (val) => {
  if (!val) {
    form.value = { ...FORM }
  }
else {
    formRef.value?.resetForm()
  }
})

const handleDelete = async (id: string) => {
  try {
    await deleteNoteId(id)
    notification.success({ message: t('successDeleted') })
    emits('update:data')
    visible.value = false

  }
  catch (error) {
    notification.error({
      message: t('AnErrorOccurred'),
    })
  }
}
const open = (item: any) => {
  if (item) {
    form.value = {
      id: item.id,
      deadline: item.deadline ? dayjs(item.deadline) : '',
      description: item.description,
      title: item.title,
    }
  }
  visible.value = true
}
  defineExpose({ open })
</script>

<style scoped>

</style>
