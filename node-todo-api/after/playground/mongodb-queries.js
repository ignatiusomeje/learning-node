const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/Users')

// var id = '5b7209f48c7744600ea102eb';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos: ', todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo){
//     return console.log('your given ID was not found');
//   }
//   console.log('Todos: ', todo);
// });

const user_id = '5b6f41587af4c7e8417a3d5a';

User.findById(user_id).then((user) => {
  if(!user){
    return console.log('user not found')
  };
  console.log('user', user)
}).catch(e => console.log(e));