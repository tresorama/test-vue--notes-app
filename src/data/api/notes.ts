import type { NoteDB, Note, NoteCreatable, NoteUpdatable } from './notes.types';

// utils
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));
const repeat = (time: number) => Array.from({ length: time });
const generateUUID = () => crypto.randomUUID();

// data mappers
const mapNoteDBToNote = (noteFromDB: NoteDB): Note => ({
  ...noteFromDB,
  date_created_at: new Date(noteFromDB.date_created_at)
});


// data creators
const createNewNote = (payload: NoteCreatable): NoteDB => ({
  ...payload,
  id: generateUUID(),
  date_created_at: new Date().toISOString(),
});


// fetchers
export const fetchNotesFromDb = async (): Promise<Note[]> => {
  await sleep(3000);
  const notesDB: NoteDB[] = repeat(1000)
    .map((_, i) => createNewNote({
      title: "Noteworthy technology acquisitions 2021 - " + (i + 1),
      content: Math.random() > 0.5
        ? `<p>Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.</p>`
        : `<h1>This is a Heading</h1>
        <p>This is some example text that you might see in a WYSIWYG editor.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <p>Another paragraph of example text.</p>
        <blockquote>
          <p>Here's a quote from someone.</p>
          <footer>- Famous Person</footer>
        </blockquote>
        <p>And here's some <strong>bold text</strong> and <em>italic text</em>!</p>
        <img src="example-image.jpg" alt="Example Image">
        `,
    }));
  const notes = notesDB.map(mapNoteDBToNote);
  return notes;
};
export const createNoteToDb = async (payload: NoteCreatable): Promise<Note> => {
  await sleep(3000);
  const newNoteDB = createNewNote(payload);
  const note = mapNoteDBToNote(newNoteDB);
  return note;
};
export const updateNoteToDb = async (payload: NoteUpdatable): Promise<boolean> => {
  await sleep(3000);
  return true;
};
export const deleteNoteFromDb = async (payload: Note['id']): Promise<boolean> => {
  await sleep(3000);
  return true;
};