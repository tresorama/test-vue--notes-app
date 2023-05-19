<script setup lang="ts">
import { ref, computed } from "vue";
import { ListBulletIcon, Squares2X2Icon, TrashIcon } from "@heroicons/vue/20/solid";
import type { Note } from "../../../data/api/notes.types";
import Button from 'primevue/button';
import SearchInput from "./ui/SearchInput.vue";

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
        <span class="p-buttonset">
          <Button
            @click="viewStyle = 'grid'"
            severity="secondary" 
            :outlined="viewStyle !== 'grid'"
            size="small"
          >
            <Squares2X2Icon class="w-4 h-4 mr-2 fill-current" />
            Grid
          </Button>
          <Button
            @click="viewStyle = 'list'"
            severity="secondary" 
            :outlined="viewStyle !== 'list'"
            size="small"
          >
            <ListBulletIcon class="w-4 h-4 mr-2 fill-current" />
            List
          </Button>
        </span>
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
          <Button
            @click.stop="handleItemDeleteClick(note.id)"
            severity="danger"
            outlined
            rounded
            size="small"
          >
            <TrashIcon class="w-4 h-4 fill-current" />
            <span class="sr-only">Delete Note</span>
          </Button>
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
          <Button
            @click.stop="handleItemDeleteClick(note.id)"
            severity="danger"
            outlined
            rounded
            size="small"
          >
            <TrashIcon class="w-4 h-4 fill-current" />
            <span class="sr-only">Delete Note</span>
          </Button>
        </div>
        <article class="format format-sm line-clamp-3 opacity-50" v-html="note.content" />
      </div>
    </div>
  </template>
</template>
