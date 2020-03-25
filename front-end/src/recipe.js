import React/*{, setState, useState }*/ from 'react';
import './recipe.css';

const Recipes = () => {

	//const [count, setCount] = useState(0);
	/*function favorite(event){

		let newItem = {
			name: props.name,
			ingredients: props.ingredients
		}

		this.setState((prevState) => {
			return {

			};
		});

		alert("Added To Favorites");
		event.preventDefault();
	}
*/
	return(
<div className="Recipes">
	<h2>Recipe List</h2>
	<div className="box">
		<button onclick="favorited()">Add to Favorites</button>
		<h3>Recipe Name</h3>
		<h5>Ingredients:</h5>
	</div>
</div>
	);
}

export default Recipes;