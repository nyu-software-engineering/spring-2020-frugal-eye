import React, { useState } from 'react';
import { useParams } from "react-router";
import Popup from './components/Popup';
import './recipepage.css'
const RecipePage = (props) => {
    const [matchPopup, setMatchPopup] = useState(true);
    const data = require("./Sampledata");
    let {name} = useParams();

    let id = parseInt(useParams());
    //let {recipeName} = data[id].name;

   function favorited(){
alert(data[1])
    }
    //onclick the name of the recipe from the recipelist will store the name in props and load this page
    //name = props.recipeName
    return(
        <div>
        <button className="back-button" onClick={event => window.location.href='/home'}>Back to home</button>
        <br></br>
        <button className="recipes-button" onClick={event => window.location.href='/recipelist'}>Back to recipes</button>
        <br></br>
        <div className = "recipe">
        <h3>{name}</h3>
        <button onClick={null}>Add to Favorites</button>
					<p>Cut the Foo</p>
					<p>Break the Baz</p>
					<p>Let the Bar raise</p>
		</div>
        </div>
    );
}
export default RecipePage;