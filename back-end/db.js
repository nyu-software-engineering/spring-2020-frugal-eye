const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String,
    ingredients: [String]
});

mongoose.model("User", User);

mongoose.connect('mongodb://localhost/agile', { useNewUrlParser: true, useUnifiedTopology: true});
