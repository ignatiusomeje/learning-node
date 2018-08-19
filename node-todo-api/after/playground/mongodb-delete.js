// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('unable to connect to mongoDB server');
  }

  console.log('connected to mongoDB server');
  
 //deleteMany
  // db.collection('Todos').deleteMany({text: 'God is good'}).then((result) => {
  //   console.log(result);
  // });
 //deleteOne
  // db.collection('Todos').deleteOne({text: 'it is ok good'}).then((result) => {
  //   console.log(result);
  // });
 //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({Name: 'Mr Endowed'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b6f00cc1281484ad3a4d25b')}).then((result) => {
    console.log(result);
  });

  db.close();
})