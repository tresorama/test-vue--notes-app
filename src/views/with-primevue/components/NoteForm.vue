<script setup lang="ts">
import { reactive } from 'vue'
import TinyMCE_Editor from '@tinymce/tinymce-vue'
import type { NoteCreatable } from '../../../data/api/notes.types'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const TINY_MCE_API_KEY = '0zvb6p8uduv6jv5nxf08u4hig4cqp0c266jeojz1n3fpggvh'

const props = defineProps<{
  initialValues?: NoteCreatable
  submitButtonText: string
  isMutating: boolean
}>()
const emits = defineEmits<{
  (e: 'submit', note: NoteCreatable): void
}>()

const formValues = reactive({
  title: props.initialValues?.title ?? '',
  content: props.initialValues?.content ?? ''
})

const handleSubmit = () => {
  emits('submit', {
    title: formValues.title,
    content: formValues.content
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-8 flex flex-col gap-2">
      <label for="title">Title</label>
      <InputText v-model="formValues.title" id="title" placeholder="..." class="p-input-sm" />
    </div>
    <div class="flex flex-col gap-2">
      <label for="content">Content</label>
      <TinyMCE_Editor
        v-model="formValues.content"
        id="content"
        :api-key="TINY_MCE_API_KEY"
        :init="{
          plugins: 'lists link image table code help wordcount',
          toolbar:
            'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
        }"
      />
    </div>
    <div class="mt-8">
      <Button
        type="submit"
        :class="{
          'animate-pulse': isMutating
        }"
        :disabled="isMutating"
        :loading="isMutating"
      >
        {{ props.submitButtonText ?? 'Submit' }}
      </Button>
    </div>
  </form>
</template>
