const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  // we will call next after async action like read from db - this is the success mark
  next();
});

//blocking the whole website cause there is no call to next!
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));
// app.get('/', (req, res) => {
// //ex1  res.send('<h1>hello!</h1>');
// ex2:  res.send({
//     name: 'bar',
//     likes: [
//       'movie',
//       'cities'
//     ]
//   });
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMsg: 'Welcome to my first website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errMsg: 'Unable to handle request'
  });
});

app.listen(3000);
