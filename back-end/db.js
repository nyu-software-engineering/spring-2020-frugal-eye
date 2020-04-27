const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: String,
    password: String,
    ingredients: [String]
    //favorites: {type: mongoose.Schema.Types.ObjectId, ref:'Recipe'},
});

//TODO: add schema for recipes 
// const Recipe = new mongoose.Schema({
// });

User.methods.isValidPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch(error) {
		throw new Error(error);
	}
}

mongoose.model("User", User);

mongoose.connect('mongodb://localhost/agile', { useNewUrlParser: true, useUnifiedTopology: true});

