require('./db')
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const axios = require("axios")
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const passport = require('passport')
const passportConf = require('./passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

signToken = user => {
  return JWT.sign({
    iss: 'frugaleye',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'frugaleyeauthentication');
}

app.post('/', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) {
            if (err == "Incorrect password") {
              res.sendStatus(204);
            }
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }
        if (!user) {
            res.sendStatus(205);
        }
        const token = signToken(user);
        res.status(200).json({ token: token });
    })
    (req, res);
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
          const token = signToken(newUser);
          res.status(200).json({ token: token });
        }
      });
    }
    else {
      res.sendStatus(204);
    }
});

app.post('/settings', (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        const username = req.body.username
        const password = req.body.password
        res.sendStatus(200)
    })
    (req, res);
});

app.get('/recipelist', (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        //axios.get our api in the future
        const body = require('../front-end/src/Sampledata')
        res.json(body)
    })
    (req, res);
});

app.get('/favoritelist', (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        //axios.get our api in the future w/ find function
        const body = require('../front-end/src/Sampledata')
        res.json(body)
    })
    (req, res);
});

app.post('/add-ingredients', (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        const ingredientsList = req.body;
        res.sendStatus(200)
    })
    (req, res);
});

app.get('/recipe', (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        const body = require('../front-end/src/Sampledata2')
        res.json(body)
    })
    (req, res);
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


