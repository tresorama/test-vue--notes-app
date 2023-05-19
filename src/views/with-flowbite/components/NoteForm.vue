<script setup lang="ts">
import { reactive } from "vue";
import TinyMCE_Editor from '@tinymce/tinymce-vue'
import type { NoteCreatable } from "../../../data/api/notes.types";

const TINY_MCE_API_KEY = "0zvb6p8uduv6jv5nxf08u4hig4cqp0c266jeojz1n3fpggvh";

const props = defineProps<{
  initialValues?: NoteCreatable,
  submitButtonText: string;
  isMutating: boolean,
}>();
const emits = defineEmits<{
  (e: "submit", note: NoteCreatable): void;
}>();

const formValues = reactive({
  title: props.initialValues?.title ?? '',
  content: props.initialValues?.content??'',
})

const handleSubmit = () => {
  emits("submit", {
    title: formValues.title,
    content: formValues.content,
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-8">
      <label
        for="title"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Title</label
      >
      <input
      v-model="formValues.title"
        name="title"
        id="title"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="..."
      />
    </div>

    <div>
      <label
        for="content"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Content</label
      >
      <TinyMCE_Editor 
        v-model="formValues.content"
        :api-key="TINY_MCE_API_KEY"
        :init="{
          plugins: 'lists link image table code help wordcount',
          toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help',
        }"
      />
    </div>
    <button
      type="submit"
      class="mt-8 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      :class="{
        'animate-pulse': isMutating,
      }"
      >
      {{ props.submitButtonText ?? "Submit" }}
    </button>
  </form>
</template>
