require('./db')
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const axios = require("axios")
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const User = mongoose.model('User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if(username === "goodUser"){
      res.sendStatus(200)
    }
    else if(username === "badUser"){
      res.sendStatus(204)
    }
    else{
      res.sendStatus(202)
    }
});

app.post('/register', (req, res) => {
    const new_username = req.body.new_username
    const new_password = req.body.new_password
    if(new_password.length >= 8){
      User.findOne({username: req.body.new_username}).then(function(currentUser) {
        if(currentUser) {
          console.log("User is already registered:", currentUser);
          res.sendStatus(205);
        } else {
          var newUser = new User({
            username: req.body.new_username,
            password: bcrypt.hashSync(req.body.new_password, bcrypt.genSaltSync(10))
          });
          newUser.save(function(err, user) {
            if (err) throw err;
            console.log("User has been registered!")
          })
          res.sendStatus(200);
        }
      });
    }
    else {
      res.sendStatus(204);
    }
});

app.post('/settings', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    res.sendStatus(200)
});

app.get('/recipelist', (req, res) =>{
    //axios.get our api in the future
    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.get('/favoritelist', (req, res) =>{
    //axios.get our api in the future w/ find function
    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.get('/add-ingredients', (req, res) => {
  User.findOne({}, function(err, user) {
    if (err) throw err;
    res.send(user.ingredients);
  });
});

app.post('/add-ingredients', (req, res) => {
  //TODO: need to add ingredients onto current user after user authorization is implemented, for now added it to first object in the User collection
    User.findOneAndUpdate({}, {ingredients: req.body}, {useFindAndModify: false}, function(err, ingredients) {
      if (err) throw err;
    });
    res.sendStatus(200)
});

app.get('/recipe', (req, res) => {
	const body = require('../front-end/src/Sampledata2')
    res.json(body)
});

//temporary tests for the hard coded sampledata json files
app.get('/recipe/1', (req, res) => {
	const body = require('../front-end/src/Sampledata2')
    res.json(body)
});

app.get('/recipe/2', (req, res) => {
	const body = require('../front-end/src/Sampledata2')
    res.json(body)
});

app.get('/recipe/3', (req, res) => {
	const body = require('../front-end/src/Sampledata2')
    res.json(body)
});

module.exports = app;


