console.log('starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes');

// console.log(_.isString(true));
// console.log(_.isString('excel'));

var filteredArray = _.uniq(['excel',1,'excel',1,2,3,4,3,2,1,3,4,5,'excel']);
console.log(filteredArray)

// var user = os.userInfo();
// var res = notes.addNumber();
// console.log(res);
// console.log('result: ',notes.add(9, 8));

// fs.appendFile('greetings.txt', ` Hello ${user.username}!!!. you are ${notes.age} years old. `, (err)=>{
//   if(err){
//     console.log('file cannot be created due to some errors experienced');
//   }
// });