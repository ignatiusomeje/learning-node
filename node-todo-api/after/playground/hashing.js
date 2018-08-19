const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var password = 'bewareofhackers';

// bcrypt.genSalt(10,(err, salt) => {
//   bcrypt.hash(password, salt,(err, hash) =>{
//     console.log(hash)
//   });
// });

var hashedPassword = '$2a$20$EMQsLVZxHw8wlNi5jSjn4.RXwF3MTJjhAs1443siba5vc8gNjhYP2';

bcrypt.compare(password,hashedPassword,(err,res) => {
  console.log(res);
});

// var data ={
//   id: 34
// };

// var token = jwt.sign(data, 'bewareofhackers');
// console.log(token)
// var decoded = jwt.verify(token, 'bewareofhackers');
// console.log('decoded: ', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`message: ${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'someleakedsecrets').toString()
// };
// console.log('token hash: ', token.hash)
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var result_hash = SHA256(JSON.stringify(token.data) + 'someleakedsecrets').toString()

// if (result_hash === token.hash){
//   console.log('Happy Login')
// } else {
//   console.log('Get away you mr hacker, you can\'t login with your modified credentials')
// }