// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('unable to connect to mongoDB server');
  }

  console.log('connected to mongoDB server');
  
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b6efd0f1281484ad3a4d075')
  // },{
  //   $set:{
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) => console.log(result));

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b6ec8e6fdca6c2df410af64')
  },{
    $set:{
      Name: 'God'
    },
    $inc: {
      Age : 1
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.close();
})