require('./db')
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const axios = require("axios")
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const JWT = require('jsonwebtoken');

const passport = require('passport')
const passportConf = require('./passport');

const { check, validationResult } = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");  next();
});

signToken = user => {
  return JWT.sign({
    iss: 'frugaleye',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'frugaleyeauthentication');
}

async function changeUserInfo(username, new_username, password, new_password, res) {
    try {
        const thisUser = await User.findOne({username: username})
        if (!thisUser){
            return res.sendStatus(205);
        }
        const check_user = await User.findOne({username: new_username})

        if (check_user && check_user.id != thisUser.id){
            return res.sendStatus(207);
        }
        
        const isMatch = await thisUser.isValidPassword(password);
        console.log(isMatch)
        if (!isMatch) {
            return res.sendStatus(206);
        }

        let update_user = "";
        let update_pass = "";

        if (new_username != "") {
            update_user = new_username;
        }
        else {
            update_user = username;
        }
        if (new_password != "") {
            if (new_password.length >= 8) {
                update_pass = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
            }
            else {
                return res.sendStatus(204);
            }
        }
        else {
            update_pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        }
        console.log(update_user);
        console.log(update_pass);

        const updateUser = await User.findOneAndUpdate({ username: username },
            { username: update_user, password: update_pass }, {
            returnOriginal: false,
            useFindAndModify: false
        });
        console.log(updateUser.username)
        return res.sendStatus(200);
    } catch (error) {
        return res.sentStatus(400)
    }
};

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

app.post('/settings', async (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log(err)
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        const username = req.body.username
        const password = req.body.password
        const new_username = req.body.new_username
        const new_password = req.body.new_password

        changeUserInfo(username, new_username, password, new_password, res)
        
    })
    (req, res);
});

app.get('/clearfav', (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if(err || !user){
            console.log(user)
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        console.log("CLEAR FAV REACHED");
        User.findOneAndUpdate({username: user.username}, {favorites: []}, {useFindAndModify: false}, function(err, currentUser){
          if(err) throw err;
        });
    })
    (req, res);
});

app.get('/recipelist', (req, res) =>{
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        User.findOne({username: user.username}, function(err, user){
          if(err) throw err;
          let input = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=097d255cf08b43c38036c60fb487d129&ingredients="
          for(let i=0; i< user.ingredients.length; i++){
            input += user.ingredients[i];
            if(i !== user.ingredients.length-1){
               input += ",+";
            }
          }
          input+= "&number=10";
          axios.get(input).then(function(response) {
                res.send({data:response.data});
          });

        });
        // mongodb -> user info -> ingredients -> edit string for API request -> return correct items
        // still need to implement picture from API to real pic on website
        // & colors.-
        //axios.get our api in the future

        //Get DB object, take the object of ingredients.
        //call API with ingredients as the search filter
        //https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

        //return said .json
    })
    (req, res);
});

app.get('/favoritelist', (req, res) =>{
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        User.findOne({username: user.username}, function(err, currentuser){
          if(err) throw err;
            //send favorites into res.body
            res.send({data: currentuser.favorites})
          //axios.get("https://api.spoonacular.com/recipes/findByIngredients?apiKey=097d255cf08b43c38036c60fb487d129&ingredients=apple,+banana&number=3").then(function(response) {
            //console.log(response.data);
            //res.send({data:response.data});
          //});

        });
    })
    (req, res);
});

app.get('/add-ingredients', (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        User.findOne({username: user.username}, function(err, currentuser) {
            if (err) throw err;
            res.send(currentuser.ingredients);
        });
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
        User.findOneAndUpdate({username: user.username}, {ingredients: req.body}, {useFindAndModify: false}, function(err, updateduser) {
          if (err) throw err;
        });
        res.sendStatus(200)
    })
    (req, res);
});

app.post('/recipe', (req, res) => {
     passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        User.findOneAndUpdate({username: user.username}, {$push: {favorites: req.body}},{useFindAndModify: false}, function(err, updateduser) {
          if (err) throw err;
          console.log(req.body);
        });
        res.sendStatus(200)
    })
    (req, res);
});

module.exports = app;


