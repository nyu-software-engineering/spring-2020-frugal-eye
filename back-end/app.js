require('./db')
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const axios = require("axios")

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
      res.sendStatus(200)
    }
    else {
      res.sendStatus(204)
    }
});

app.post('/settings', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    res.sendStatus(200)
});

app.get('/recipelist', (req, res) =>{
    // mongodb -> user info -> ingredients -> edit string for API request -> return correct items
    // still need to implement picture from API to real pic on website
    // & colors.-
    //axios.get our api in the future

    //Get DB object, take the object of ingredients.
    //call API with ingredients as the search filter
    //https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

    //return said .json


    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.get('/favoritelist', (req, res) =>{
    mongoose.find({user: "this current user"}, function(data){
      //stringify this and return it to res
    });

    //axios.get our api in the future w/ find function
    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.post('/add-ingredients', (req, res) => {
    const ingredientsList = req.body;
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


