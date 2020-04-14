const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const axios = require("axios")

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
    //axios.get our api in the future
    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.get('/favoritelist', (req, res) =>{
    //axios.get our api in the future w/ find function
    const body = require('../front-end/src/Sampledata')
    res.json(body)
});

app.post('/add-ingredients', (req, res) => {
    const ingredientsList = req.body.ingredientsList;
    res.sendStatus(200)
});

module.exports = app;

