<script setup lang="ts">
const props = defineProps<{
  modelValue: string,
  id?: string,
  placeholder?: string,
  disableSubmitButton?: boolean,
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', newValue: string): void,
  (e: 'search-submitted', newValue: string): void,
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
    <div class="w-full relative flex items-center">
      <!-- ICON -->
      <div class="absolute flex items-center pl-3 pointer-events-none">
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
      </div>
      <!-- INPUT -->
      <input
        :value="props.modelValue"
        @input="handleInput"
        type="search"
        :id="props.id ?? 'default-search'"
        :placeholder="props.placeholder ?? 'Search ...'"
        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <!-- BUTTON -->
      <button
        v-if="!props.disableSubmitButton"
        @click="handleSubmitClick"
        type="button"
        class="text-white absolute right-1.5 px-4 py-1 font-medium rounded-md text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
    </div>
  </div>
</template>
