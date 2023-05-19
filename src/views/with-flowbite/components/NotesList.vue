<script setup lang="ts">
import { ref, computed } from "vue";
import { ListBulletIcon, Squares2X2Icon, TrashIcon } from "@heroicons/vue/20/solid";
import type { Note } from "../../../data/api/notes.types";
import SearchInput from './ui/SearchInput.vue'

const props = defineProps<{
  notes: Note[];
}>();
const emits = defineEmits<{
  (e: "note-clicked", noteId: Note["id"]): void;
  (e: "note-delete-clicked", noteId: Note["id"]): void;
}>();

const isEmptyList = computed(() => props.notes.length === 0);
const viewStyle = ref<"grid" | "list">("grid");
const searchInputValue = ref('');
const notes = computed(() => {
  const cloned = Array.from(props.notes);
  const filteredBySearch = searchInputValue.value === '' 
    ? cloned 
    : cloned.filter(item=> {
        const includesInsesnitiveString = (str:string, searchTerm:string) => str.toLowerCase().includes(searchTerm.trim().toLowerCase());
        if (includesInsesnitiveString(item.title, searchInputValue.value)) return true;
        if (includesInsesnitiveString(item.content, searchInputValue.value)) return true;
        return false;
      });
  const mostRecentsFirst = filteredBySearch.sort((a, b) => b.date_created_at.valueOf() - a.date_created_at.valueOf());
  return mostRecentsFirst;
})

const handleItemClick = (noteId: string) => emits("note-clicked", noteId);
const handleItemDeleteClick = (noteId: string) => emits("note-delete-clicked", noteId);
</script>

<template>
  <template v-if="isEmptyList">
    <div class="py-4">
      <p class="italic text-gray-500 text-center">
        You had not created any notes yet!
      </p>
    </div>
  </template>
  <template v-else>
    <div class="mb-4 flex justify-between items-start gap-8">
      <!-- SEARCH INPUT -->
      <div class="w-[20rem]">
        <SearchInput v-model="searchInputValue" :disable-submit-button="true"/>
      </div>
      <!-- VIEW STYLE SWITCHER -->
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button
          @click="viewStyle = 'grid'"
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-l-lg focus:z-10 focus:ring-2"
          :class="{
            'bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white':
              viewStyle !== 'grid',
            'bg-gray-200 text-blue-700 dark:text-white dark:bg-gray-600':
              viewStyle === 'grid',
          }"
        >
          <Squares2X2Icon class="w-4 h-4 mr-2 fill-current" />
          Grid
        </button>
        <button
          @click="viewStyle = 'list'"
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-r-md focus:z-10 focus:ring-2"
          :class="{
            'bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white':
              viewStyle !== 'list',
            'bg-gray-100 text-blue-700 dark:text-white dark:bg-gray-600':
              viewStyle === 'list',
          }"
        >
          <ListBulletIcon class="w-4 h-4 mr-2 fill-current" />
          List
        </button>
      </div>
    </div>

    <div v-if="viewStyle === 'list'" class="space-y-4">
      <div
        v-for="note in notes"
        :key="note.id"
        @click="handleItemClick(note.id)"
        class="cursor-pointer relative block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="flex justify-between items-start">
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ note.title }}
          </h2>
          <button
            @click="handleItemDeleteClick(note.id)"
            type="button" 
            class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <TrashIcon class="w-4 h-4 fill-current" />
            <span class="sr-only">Delete Note</span>
          </button>
        </div>
        <article class="format format-sm line-clamp-3 opacity-50" v-html="note.content" />
      </div>
    </div>
    <div v-if="viewStyle === 'grid'" class="grid grid-cols-2 gap-4">
      <div
        v-for="note in notes"
        :key="note.id"
        @click="handleItemClick(note.id)"
        class="cursor-pointer relative block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="flex justify-between items-start">
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ note.title }}
          </h2>
          <button
            @click.stop="handleItemDeleteClick(note.id)"
            type="button" 
            class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <TrashIcon class="w-4 h-4 fill-current" />
            <span class="sr-only">Delete Note</span>
          </button>
        </div>
        <article class="format format-sm line-clamp-3 opacity-50" v-html="note.content" />
      </div>
    </div>
  </template>
</template>
