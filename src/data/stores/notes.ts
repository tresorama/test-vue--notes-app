import { defineStore } from "pinia";
import { createNoteToDb, updateNoteToDb, fetchNotesFromDb, deleteNoteFromDb } from "../api/notes";
import type { Note } from "../api/notes.types";

// utils
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));

// crete a pinia store
type State = {
  notes: Note[];
  notesFetchStatus: "idle" | "pending" | "success" | "error";
  noteMutateStatus: "idle" | "pending" | "success" | "error";
};

export const useNotesStore = defineStore("notes", {
  state: (): State => ({
    notes: [],
    notesFetchStatus: "idle",
    noteMutateStatus: 'idle',
  }),
  actions: {
    async fetchNotes() {
      let isSuccess: boolean = false;
      this.notesFetchStatus = "pending";
      try {
        const notes = await fetchNotesFromDb();
        this.notes = notes;
        this.notesFetchStatus = "success";
        isSuccess = true;
      } catch (err) {
        this.notesFetchStatus = "error";
        isSuccess = false;
      }
      return isSuccess;
    },
    async createNote(note: Parameters<typeof createNoteToDb>[0]) {
      let isSuccess: boolean = false;
      this.noteMutateStatus = "pending";
      try {
        const newNote = await createNoteToDb(note);
        this.notes.push(newNote);
        this.noteMutateStatus = "success";
        isSuccess = true;
      } catch (error) {
        this.noteMutateStatus = "error";
        isSuccess = false;
      }
      return isSuccess;
    },
    async updateNote(updatedNote: Parameters<typeof updateNoteToDb>[0]) {
      let isSuccess: boolean = false;
      this.noteMutateStatus = "pending";
      try {
        const isUpdated = await updateNoteToDb(updatedNote);
        if (!isUpdated) throw 'fall to catch';
        this.notes = this.notes.map(n => {
          if (n.id !== updatedNote.id) return n;
          return { ...n, ...updatedNote };
        });
        this.noteMutateStatus = "success";
        isSuccess = true;
      } catch (error) {
        this.noteMutateStatus = "error";
        isSuccess = false;
      }
      return isSuccess;
    },
    async deleteNote(noteId: Parameters<typeof deleteNoteFromDb>[0]) {
      let isSuccess: boolean = false;
      try {
        const isDeleted = await deleteNoteFromDb(noteId);
        if (!isDeleted) throw 'fall to catch';
        this.notes = this.notes.filter(n => n.id !== noteId);
        isSuccess = true;
      } catch (error) {
        isSuccess = false;
      }
      return isSuccess;
    },
    async createDemoNote() {
      return this.createNote({
        title: "Demo",
        content: "<p>Ciao</p>",
      });
    },
    async demoRefetchNotes() {
      let isSuccess: boolean = false;
      this.notesFetchStatus = "pending";
      try {
        await sleep(3000);
        this.notesFetchStatus = "success";
        isSuccess = true;
      } catch (err) {
        this.notesFetchStatus = "error";
        isSuccess = false;
      }
      return isSuccess;
    }
  },
});
