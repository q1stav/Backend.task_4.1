const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNode(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();
  notes.forEach((note) => {
    console.log(note.id, "  ", note.title);
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const filtered = notes.filter((note) => note.id !== id);
  await saveNotes(filtered);
  console.log(chalk.red(`Note with id="${id}" has been removed.`));
}

async function editNote(id,newNote) {
  
  const notes = await getNotes();
  const edited = notes.map(function (note) {
    if (note.id == id) {
      note.title=newNote;
    }
    return note;
  });
  await saveNotes(edited);
}

module.exports = {
  addNode,
  getNotes,
  printNotes,
  removeNote,
  editNote,
};
