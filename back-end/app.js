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
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false);
        }
        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return done("Incorrect password");
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        return res.redirect('/');
    }
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
        res.sendStatus(200);
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
            res.sendStatus(200);
          })
        }
      });
    }
    else {
      res.sendStatus(204);
    }
});

app.post('/settings', ensureAuthenticated, (req, res) => {
    const username = req.body.username
    const password = req.body.password
    res.sendStatus(200)
});

app.get('/recipelist', ensureAuthenticated, (req, res) => {
    //axios.get our api in the future
    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.get('/favoritelist', ensureAuthenticated, (req, res) => {
    //axios.get our api in the future w/ find function
    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.post('/add-ingredients', ensureAuthenticated, (req, res) => {
    const ingredientsList = req.body;
    res.sendStatus(200)
});

app.get('/recipe', ensureAuthenticated, (req, res) => {
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


