import type { NoteDB, Note, NoteCreatable, NoteUpdatable } from './notes.types';

// utils
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));
const generateUUID = () => crypto.randomUUID();


// fake db - data creators
const createNewNote = (payload: NoteCreatable): NoteDB => ({
  ...payload,
  id: generateUUID(),
  date_created_at: new Date().toISOString(),
});

// fake db - initial data
const initialNotesDB: NoteDB[] = [
  {
    title: "Favorite Movies",
    content: "<h2>The Shawshank Redemption</h2><p>A gripping tale of friendship and redemption set in Shawshank State Penitentiary.</p><ul><li>Directed by Frank Darabont</li><li>Starring Tim Robbins and Morgan Freeman</li><li>Released in 1994</li></ul>",
  },
  {
    title: "Must-Read Books",
    content: "<h2>To Kill a Mockingbird</h2><p>A classic novel by Harper Lee that addresses racial injustice in the American South.</p><ul><li>Published in 1960</li><li>Won the Pulitzer Prize</li><li>Themes: prejudice, morality, and compassion</li></ul>",
  },
  {
    title: "Study Notes - Mathematics",
    content: "<h2>Algebraic Equations</h2><p>In mathematics, an algebraic equation is an equation involving one or more variables and constants. It consists of expressions on both sides separated by an equals sign.</p><ul><li>Examples:<ul><li><em>x + 3 = 7</em></li><li><em>2y - 5 = 3y + 1</em></li></ul></li><li>Common techniques: solving for the unknown variable, factoring, substitution</li></ul>",
  },
  {
    title: "Travel Destinations",
    content: "<h2>Paris, France</h2><p>Known as the City of Love, Paris offers a wealth of attractions and cultural experiences.</p><ul><li>Landmarks:<ul><li>Eiffel Tower</li><li>Louvre Museum</li><li>Notre-Dame Cathedral</li></ul></li><li>Gastronomy:<ul><li>Croissants</li><li>Escargots</li><li>French cheese</li></ul></li><li>Popular neighborhoods:<ul><li>Montmartre</li><li>Le Marais</li><li>Saint-Germain-des-Prés</li></ul></li></ul>",
  },
  {
    title: "Fitness Tips",
    content: "<h2>High-Intensity Interval Training (HIIT)</h2><p>HIIT is a form of cardiovascular exercise that alternates between intense bursts of activity and short recovery periods.</p><ul><li>Benefits:<ul><li>Efficient calorie burning</li><li>Improved cardiovascular health</li><li>Time-saving</li></ul></li><li>Sample routine:<ul><li>Warm-up: 5 minutes of light cardio</li><li>Work phase: 30 seconds of intense exercise</li><li>Recovery phase: 30 seconds of low-intensity exercise</li><li>Repeat for 10-20 minutes</li></ul></li></ul>",
  },
  {
    title: "Inspiring Quotes",
    content: "<h2>Inspiration for Success</h2><p>“The only way to do great work is to love what you do.” - Steve Jobs</p><ul><li>“Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.” - Albert Schweitzer</li><li>“Believe you can and you're halfway there.” - Theodore Roosevelt</li><li>“The road to success and the road to the road to failure are almost exactly the same.” - Colin R. Davis</li><li>“Success usually comes to those who are too busy to be looking for it.” - Henry David Thoreau</li><li>“Success is not in what you have, but who you are.” - Bo Bennett</li></ul>",
  },
  {
    title: "Music Recommendations",
    content: "<h2>Album Recommendation: Dark Side of the Moon</h2><p>Dark Side of the Moon is a progressive rock album by Pink Floyd.</p><ul><li>Released in 1973</li><li>Key Tracks:<ul><li><em>Money</em></li><li><em>Time</em></li><li><em>Us and Them</em></li></ul></li><li>Genre: Progressive rock</li></ul>",
  },
  {
    title: "Important Dates",
    content: "<h2>Upcoming Anniversary</h2><p>Mark your calendar for May 25th, 2023, which is our anniversary!</p>",
  },
  {
    title: "Favorite TV Shows",
    content: "<h2>Breaking Bad</h2><p>A critically acclaimed television series that follows the transformation of a high school chemistry teacher into a methamphetamine kingpin.</p><ul><li>Starring Bryan Cranston as Walter White</li><li>Five seasons, aired from 2008 to 2013</li><li>Emmy Award-winning series</li></ul>",
  },
  {
    title: "Business Ideas",
    content: "<h2>Online Clothing Store</h2><p>Thinking of starting your own online clothing store? Here are a few key considerations:</p><ul><li>Target audience: Identify your niche and target market</li><li>Product selection: Curate a diverse range of fashionable items</li><li>E-commerce platform: Choose a user-friendly platform for your online store</li><li>Marketing strategy: Develop a plan to promote your store through social media, influencers, and targeted ads</li><li>Customer service: Provide excellent customer support to build a loyal customer base</li></ul>",
  }
].map(createNewNote);


// data mappers (from db to app)
const mapNoteDBToNote = (noteFromDB: NoteDB): Note => ({
  ...noteFromDB,
  date_created_at: new Date(noteFromDB.date_created_at)
});


// fetchers
export const fetchNotesFromDb = async (): Promise<Note[]> => {
  await sleep(3000);
  const notes = initialNotesDB.map(mapNoteDBToNote);
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