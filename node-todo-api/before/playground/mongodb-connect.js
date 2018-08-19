// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('unable to connect to mongoDB server');
  }

  console.log('connected to mongoDB server');
  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // },(err,res) => {
  //   if (err){
  //     return console.log('unable to insert todo', err)
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // })
  
  // db.collection('Users').insertOne({
  //   Name: 'Mr Excel',
  //   Age: 34,
  //   Location: 'Enugu'
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('unable to write to server due to some error');
  //   }
  //   console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
  // })

  db.close();
})