<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const props = defineProps<{
  modelValue: string
  id?: string
  placeholder?: string
  disableSubmitButton?: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', newValue: string): void
  (e: 'search-submitted', newValue: string): void
}>()

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  emits('update:modelValue', input.value)
}
const handleSubmitClick = () => {
  emits('search-submitted', props.modelValue)
}
</script>

<template>
  <div class="w-full">
    <label
      :for="props.id ?? 'default-search'"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Search
    </label>
    <div class="p-input-icon-left w-full">
      <!-- ICON -->
      <i class="">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </i>
      <!-- INPUT -->
      <InputText 
        :value="props.modelValue" 
        @input="handleInput" 
        :id="props.id ?? 'default-search'"
        :placeholder="props.placeholder ?? 'Search ...'"
        class="w-full p-input-sm"
        :class="{
          '!pr-24': !props.disableSubmitButton,
        }"
      />
      <!-- BUTTON -->
      <Button
        v-if="!props.disableSubmitButton"
        @click="handleSubmitClick"
        class="!absolute !right-0.5 !px-4 !py-1 "
      >
        Search
      </Button>
    </div>
  </div>
</template>
