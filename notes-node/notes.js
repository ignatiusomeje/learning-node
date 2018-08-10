const fs = require('fs');

var fetchNote = ()=>{
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};
var saveNote = (notes)=>{
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

const addNotes  = (title, body)=>{
  var notes = fetchNote();
  var note = {
    title,
    body
  };
  var duplicateNote = notes.filter((note)=>note.title === title);

  if (duplicateNote.length === 0){
    notes.push(note);
    saveNote(notes);
    return note;
  }
};

const getAll = ()=>{
  return fetchNote();
};

const getNote = (title)=> {
  var fetchedNote = fetchNote();
  var notes = fetchedNote.filter((note)=>note.title === title);
  console.log(notes);
    return notes[0];
};

const removeNote = (title)=> {
  var fetchedNote = fetchNote();
  var note = fetchedNote.filter((note)=>note.title !== title);
  saveNote(note);
  return fetchedNote.length !== note.length;
};

const logNote = (note)=>{
  console.log('---');
  console.log(`The Title: ${note.title}`);
  console.log(`The Body: ${note.body}`);
};

module.exports = {
  addNotes,
  getAll,
  getNote,
  removeNote,
  logNote
};