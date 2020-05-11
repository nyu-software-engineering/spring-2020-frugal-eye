require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: String,
    password: String,
    ingredients: [String],
    favorites: [{id: Number, title: String, image: String}]
});

User.methods.isValidPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch(error) {
		throw new Error(error);
	}
}

mongoose.model("User", User);

mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0-kvl5v.gcp.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true", { useNewUrlParser: true, useUnifiedTopology: true});

