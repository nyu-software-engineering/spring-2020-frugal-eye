require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: String,
    password: String,
    ingredients: [String],
    favorites: {type: mongoose.Schema.Types.ObjectId, ref:'Recipe'}
});

//TODO: add schema for recipes 
// const Recipe = new mongoose.Schema({
// 	id: Number,
// 	recipe_name: String,
// 	image: String,
// 	//imageType: String,
// 	missedIngredientCount: Number,
// 	usedIngredientCount: Number,
// 	ingredient: {
// 		ingredient_name: String,
// 		amount: Number,
// 		units: String
// 	},
// 	ingredients: [ingredient],
// 	numberSteps: Number,
// 	steps: [String]
// });

User.methods.isValidPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch(error) {
		throw new Error(error);
	}
}

mongoose.model("User", User);

mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0-kvl5v.gcp.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true", { useNewUrlParser: true, useUnifiedTopology: true});

