import React, { useState } from 'react';
import Popup from './components/Popup';
import './recipepage.css'

const RecipePage = (props) => {

	const [matchPopup, setMatchPopup] = useState(true);
  	const data = require("./Sampledata");

  	function favorited(){
  		let rName = data.index(props.recipeName)
  		console.log("favorited")
  		if(data[rName].favorite == true){
  			data[rName].favorite = false;
  		}
  		else{
  			data[rName].favorite = true;
  		}
  	}

	return(
		<div>
		<button className="backb" onClick={event => window.location.href='/home'}>Back to home</button>
		<br></br>
		<button className="recipes-button" onClick={event => window.location.href='/recipelist'}>Back to recipes</button>
		<br></br>
			<div className = "steps">
				<h3>props.recipeName</h3>
				<button onClick="favorited()">Add to Favorites</button>
					<p>Cut the Foo</p>
					<p>Break the Baz</p>
					<p>Let the Bar raise</p>
			</div>
		</div>
	);
}
export default RecipePage;