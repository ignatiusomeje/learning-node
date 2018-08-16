const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/Users')

Todo.remove({});

Todo.findOneAndRemove({_id: "dzsdv"}).then((res) => {

});

Todo.findByIdAndRemove('').then((res) => {

});