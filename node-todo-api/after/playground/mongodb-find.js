// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('unable to connect to mongoDB server');
  }

  console.log('connected to mongoDB server');
  
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b6ec66a908cb92e84e36820')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to connect to fetch datas: ', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos count: ', count);
  // }, (err) => {
  //   console.log('unable to connect to fetch datas: ', err);
  // });

  db.collection('Users').find({Name: 'Mr Excel'}).toArray().then((docs) => {
    console.log(docs);
  },(err) => {
    console.log('an error occured while fetching data ', err);
  })

  db.close();
})