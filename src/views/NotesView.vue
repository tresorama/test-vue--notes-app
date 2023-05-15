<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { Toaster, toast } from "vue-sonner";
import { PlusIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/vue/20/solid";
import NotesList from "../components/NotesList.vue";
import NoteForm from "../components/NoteForm.vue";
import type { Note } from "../data/api/notes.types";
import { useNotesStore } from "../data/stores/notes";

const notesStore = useNotesStore();
const { notes, notesFetchStatus, noteMutateStatus } = storeToRefs(notesStore);
const { fetchNotes, createNote, updateNote, deleteNote, createDemoNote, demoRefetchNotes } = notesStore;
const isCreatingNote = ref(false);
const currentEditingNoteId = ref<null | Note["id"]>(null);
const currentEditingNote = computed(() => {
    if (!currentEditingNoteId.value) return undefined;
    return notes.value.find(n=>n.id=== currentEditingNoteId.value);
  });
const isEditingNote = computed(
  () => !isCreatingNote.value && currentEditingNoteId.value !== null
);

const handleStartCreateNoteClick = () => { isCreatingNote.value = true; };
const handleCancelCreateNoteClick = () => { isCreatingNote.value = false; };
const handleCancelEditingNoteClick = () => { currentEditingNoteId.value = null; };
const handleRefreshNotesClick = demoRefetchNotes;
const handleCreateNoteSubmit = async (note: Parameters<typeof createNote>[0]) => {
  const isSuccess = await createNote(note);
  if (isSuccess) {
    toast.success("Created Note: " + JSON.stringify(note));
  } else {
    toast.error("Note not created: " + JSON.stringify(note));
  }
};
const handleUpdateNoteSubmit = async (noteUpdates: Partial<Note>) => {
  if(!currentEditingNote.value) return;
  const updatedPayload = {
    ...currentEditingNote.value,
    ...noteUpdates,
  }
  const isSuccess = await updateNote(updatedPayload)
  if (isSuccess) {
    toast.success("Updated Note: " + JSON.stringify(updatedPayload));
  } else {
    toast.error("Note not updated: " + JSON.stringify(updatedPayload));
  }
};
const handleNotesListItemClick = (noteId:Note['id']) => { currentEditingNoteId.value = noteId}
const handleNotesListItemDeleteClick = (noteId:Note['id']) => deleteNote(noteId);
const handleCreateDemoNoteClick = async () => {
  const isSuccess = await createDemoNote();
  if (isSuccess) {
    toast.success("Created Demo Note!");
  } else {
    toast.error("Demo Note not created!");
  }
};

onMounted(fetchNotes);
</script>

<template>
  <!-- Toast -->
  <Toaster />
  <main class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="py-10 px-8 flex items-center">
      <h1 class="text-4xl/none font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Notes
      </h1>
      <div class="ml-4 flex gap-4">
        <button
          v-if="!isEditingNote && !isCreatingNote"
          @click="handleRefreshNotesClick"
          type="button"
          class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          :class="{
            'animate-bounce': notesFetchStatus === 'pending'
          }"
          :disabled="notesFetchStatus === 'pending'"
        >
          <ArrowPathIcon class="h-4 w-4" />
          <span class="sr-only">Refresh Notes</span>
        </button>
      </div>
      <div class="ml-auto">
        <button
          v-if="!isEditingNote && !isCreatingNote"
          @click="handleCreateDemoNoteClick"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          :class="{
            'animate-bounce': noteMutateStatus === 'pending'
          }"
          :disabled="noteMutateStatus === 'pending'"
        >
          <PlusIcon class="h-4 w-4" />
          <span>Create Demo Note</span>
          <span class="sr-only">Create Note</span>
        </button>
        <button
          v-if="!isEditingNote && !isCreatingNote"
          @click="handleStartCreateNoteClick"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <PlusIcon class="h-4 w-4" />
          <span class="sr-only">Create Note</span>
        </button>
        <button
          v-if="isCreatingNote"
          @click="handleCancelCreateNoteClick"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <XMarkIcon class="h-4 w-4" />
          <span class="sr-only">Cancel Creating Note</span>
        </button>
        <button
          v-if="isEditingNote"
          @click="handleCancelEditingNoteClick"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <XMarkIcon class="h-4 w-4" />
          <span class="sr-only">Cancel Editing Note</span>
        </button>
      </div>
    </div>
    <!-- Content -->
    <div class="px-8">
      <NoteForm
        v-if="isCreatingNote"
        @submit="handleCreateNoteSubmit"
        submit-button-text="Create"
        :is-mutating="noteMutateStatus === 'pending'"
        />
        <NoteForm
        v-if="isEditingNote"
        @submit="handleUpdateNoteSubmit"
        submit-button-text="Update"
        :is-mutating="noteMutateStatus === 'pending'"
        :initial-values="currentEditingNote"
      />
    </div>
    <div v-if="!isEditingNote && !isCreatingNote" class="px-8">
      <div v-if="notesFetchStatus === 'pending'">Loading</div>
      <div v-if="notesFetchStatus === 'error'">Error</div>
      <NotesList
        v-if="['success', 'idle'].includes(notesFetchStatus)"
        :notes="notes"
        @note-clicked="(noteId) => handleNotesListItemClick(noteId)"
        @note-delete-clicked="(noteId)=> handleNotesListItemDeleteClick(noteId)"
      />
    </div>
  </main>
</template>
