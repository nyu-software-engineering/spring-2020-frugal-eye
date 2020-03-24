import React, { setState, useState } from 'react';
import recipe from '/recipe';

const Recipes = (props) => {
	const [count, setCount] = useState(0);
	console.log("Test")
	function favorite(event){

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

	return(
<div className="Recipes">
	<h1>Hello</h1>
	<button>Add to Favorites</button>
</div>
	);
}

export default recipe;