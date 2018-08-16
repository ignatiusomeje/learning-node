require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/Users');
const {authenticate} = require('./middleware/authenticate');

const App = express();

const port = process.env.PORT || 3000;

App.use(bodyParser.json());

App.post('/todos',authenticate,(req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((docs) => {
    res.send(docs)
  }, (err) => {
    res.status(400).send(err);
  });
});

App.get('/todos',authenticate,(req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send(todos)
  },(e) => {
    res.status(400).send(e)
  });
});

App.get('/todos/:id',authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo){
      return res.status(404).send();
    };

    res.status(200).send({todo});
  }, (e) => res.status(400).send());
});

App.delete('/todos/:id',authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  };

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((docs) => {
    if (!docs){
      return res.status(404).send()
    };

    res.status(200).send(docs)
  }, (err) => res.status(400).send())
});

App.patch('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  };

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  };

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo){
      return res.status(404).send()
    };

    res.status(200).send({todo});
  }, (err) => {
    res.status(400).send();
  });
});

  App.post('/users',(req, res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth',token).send(user)
    }).catch((err) => res.status(400).send(err));
  });

  App.get('/users/me',authenticate,(req, res) => {
    res.send(req.user);
  });

  App.post('/users/login', (req, res) => {
    var body = _.pick(req.body,['email', 'password']);

    User.findByCredentials(body.email,body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth',token).send(user)
      });
    }).catch((e) => {
      res.status(400).send();
    });
  });

  App.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send()
    }, () =>{
      res.status(400).send();
    });
  })

App.listen(port, () => {
  console.log(`your server is up on port ${port}`);
})


module.exports = {App};