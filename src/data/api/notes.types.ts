// Type of data coming serialized from database
export type NoteDB = {
  id: string;
  title: string;
  content: string;
  date_created_at: string, // ISO string
};

// Types of data as available at runtime in this app
// this mans that some property data types are casted or converted
export type Note = {
  id: NoteDB['id'],
  title: NoteDB['title'],
  content: NoteDB['content'],
  date_created_at: Date,
};
export type NoteCreatable = Omit<Note, 'id' | 'date_created_at'>;
export type NoteUpdatable = Partial<Note> & { id: Note['id']; };
