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

App.delete('/todos/:id',authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  };

  try{

    const docs = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
      if (!docs){
        return res.status(404).send()
      };

      res.status(200).send(docs)
  }catch(e){
    res.status(400).send()
  }
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

  App.post('/users', async (req, res) => {
    try{
      const body = _.pick(req.body,['email','password']);
      const user = new User(body);
      await user.save();
      const token = await user.generateAuthToken();
      res.header('x-auth',token).send(user);
    }catch(err){
      res.status(400).send(err)
    }
  });

  App.get('/users/me',authenticate,(req, res) => {
    res.send(req.user);
  });

  App.post('/users/login', async (req, res) => {
    try{
      const body = _.pick(req.body,['email', 'password']);
      const user = await User.findByCredentials(body.email,body.password);
      const token = await user.generateAuthToken();
      res.header('x-auth',token).send(user)
    }catch(e){
      res.status(400).send();
    }
  });

  App.delete('/users/me/token', authenticate, async (req, res) => {
    try{
      await req.user.removeToken(req.token);
      res.status(200).send()
    }catch(e){
      res.status(400).send();
    }
  })

App.listen(port, () => {
  console.log(`your server is up on port ${port}`);
})


module.exports = {App};