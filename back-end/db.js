const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String,
    ingredients: [String]
    //favorites: {type: mongoose.Schema.Types.ObjectId, ref:'Recipe'},
});

//TODO: add schema for recipes 
// const Recipe = new mongoose.Schema({
// });

mongoose.model("User", User);

mongoose.connect('mongodb://localhost/agile', { useNewUrlParser: true, useUnifiedTopology: true});

