import React, { setState, useState } from 'react';
import Recipe from '/recipe';

const [count, setCount] = useState(0);

const Recipes(props){

	function favorite(){

		let newItem = {
			name: props.name,
			ingredients: props.ingredients
		}

		this.setState((prevState) => {
			return {
				prevState.favorites.concat(recipe)
			};
		});

		alert("Added To Favorites");
		event.preventDefault();
	}

	return(
<div className="Recipes">
	<h1>{props.name}</h1>
	{{#each props.ingredients}}
	<p>{{this}}</p>
	{{/each}}
</div>
	):
}

export default Recipe;