const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

var titleOption = {
  describe: "Title of the note",
  demand: true,
  alias: "t"
};
var bodyOption = {
  describe: "Body of the note",
  demand: true,
  alias: "b"
};

var argv = yargs
  .command("add", "add's new note to our list of note",{
    title: titleOption,
    body: bodyOption
  })
  .command("list","list all notes")
  .command("read","read a note",{
    title: titleOption
  })
  .command("remove", "removes a note",{
    title: titleOption
  })
  .help()
  .argv;
var command = argv._[0];

if (command === "add"){
  var note = notes.addNotes(argv.title, argv.body);
  if (note){
    console.log(`Note was created successfully`);
    notes.logNote(note);

  } else{
    console.log(`The note already exist, so therefore the note wasn't saved`);
  }

} else if (command === "list"){
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note));

} else if (command === "read") {
  var note = notes.getNote(argv.title);
  if (note){
    console.log(`Note Found`);
    notes.logNote(note);

  } else{
    console.log(`The note wasn't found`);
  }

} else if (command === "remove") {
  var removedNotes = notes.removeNote(argv.title);
  var message = removedNotes ? 'The note was removed' : 'The note was not removed';
  console.log(message);

}else{
  console.log('Command Not Recognised.');
}