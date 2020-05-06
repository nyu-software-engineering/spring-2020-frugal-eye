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
        console.log(thisUser)
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
            console.log(user)
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

app.get('/recipelist', (req, res) =>{
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Auth failed',
                user   : user
            });
        }
        User.findOne({}, function(err, user){
          if(err) throw err;
          let input = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=097d255cf08b43c38036c60fb487d129&ingredients="
          for(let i=0; i< user.ingredients.length; i++){
            input += user.ingredients[i];
            if(i !== user.ingredients.length-1){
               input += ",+";
            }
          }
          input+= "&number=2";
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
        User.findOne({}, function(err, user){
          if(err) throw err;
            //send favorites into res.body
          

        });

        //axios.get our api in the future w/ find function
        const body = require('../front-end/src/Sampledata')
        res.json(body)
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
        User.findOne({}, function(err, user) {
            if (err) throw err;
            res.send(user.ingredients);
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
         //TODO: need to add ingredients onto current user after user authorization is implemented, for now added it to first object in the User collection
        User.findOneAndUpdate({}, {ingredients: req.body}, {useFindAndModify: false}, function(err, ingredients) {
          if (err) throw err;
        });
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


