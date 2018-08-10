const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('streamIt',(text) => {
  return text.toUpperCase();
})

app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next()
})

app.get('/',(req, res) => {

  res.render('home.hbs',{
    pageTitle : 'HOME PAGE',
    welcome: 'welcome to our site'
  });
});

app.get('/project',(req, res) => {
  res.render('project.hbs')
});

app.get('/about', (req, res) => {
  // res.send('<h1>WELCOME TO OUR ABOUT PAGE</h1>')
  res.render('about.hbs',{
    pageTitle : 'ABOUT PAGE'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to fulfil this request'
  });
});

app.listen(port, () => {
  console.log(`server is up and running on port ${port}`)
});