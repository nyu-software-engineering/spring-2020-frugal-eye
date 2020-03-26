import React, { useState } from 'react';
import Popup from './components/Popup';
import './recipepage.css'

const RecipePage = (props) => {

	const [matchPopup, setMatchPopup] = useState(true);
  	const data = require("./Sampledata");

  	const favorited = () => {
  		let rName = data.index(props.recipeName)
  		if(data[rName].favorite == true){
  			data[rName].favorite = false;
  		}
  		else{
  			data[rName].favorite = true;
  		}
  	}

	return(
		<div className = "recipe">
		<button className="back-button" onClick={event => window.location.href='/home'}>Back to home</button>
		<br></br>
		<button className="recipes-button" onClick={event => window.location.href='/home'}>Back to recipes</button>
		<br></br>
		<h3>props.recipeName</h3>
		<button onClick="favorited()">Add to Favorites</button>
			<p>Fooooooooo</p>
			<p>Bazzzzzzzzzzzzz</p>
			<p>Barrrrrrrrrrrrrrrr</p>
		</div>
	);
}
export default RecipePage;