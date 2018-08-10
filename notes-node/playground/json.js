const fs = require('fs');

var originalNote = {
  title: "some title",
  body: "some body"
}

var originalNoteString = JSON.stringify(originalNote);
 fs.writeFileSync('notes.json', originalNoteString);

 var notesString = fs.readFileSync('notes.json');

var notes = JSON.parse(notesString);
console.log(typeof notes);
console.log(notes.title)
