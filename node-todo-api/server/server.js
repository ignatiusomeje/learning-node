const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/Users');

const App = express();

App.use(bodyParser.json());

App.post('/todos',(req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((docs) => {
    res.send(docs);
  }, (err) => {
    res.send(err);
  });
});

App.listen(3000, () => {
  console.log('your server is up on port 3000');
})
