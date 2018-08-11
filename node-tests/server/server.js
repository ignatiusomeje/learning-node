const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('HELLO WORLD!!!');
});

app.get('/user', (req, res) => {
  res.send([{
    name: 'ifeoma',
    age: 34
  },{
    name: 'obinna',
    age: 45
  },{
    name: 'Excel',
    age: 35
  }]);
});

app.listen(3000);

module.exports.app = app;