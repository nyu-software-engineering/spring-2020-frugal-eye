import React, { useState } from 'react';
import { useParams } from "react-router";
import Popup from './components/Popup';
import './recipepage.css'
const RecipePage = (props) => {
    const [matchPopup, setMatchPopup] = useState(true);
    const data = require("./Sampledata");
    let {name} = useParams();
    function favorited(){
        if(data[{name}].favorite == true){
            data[{name}].favorite = false;
        }
        else{
            data[{name}].favorite = true;
        }
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
        <button onClick="favorited()">Add to Favorites</button>
					<p>Cut the Foo</p>
					<p>Break the Baz</p>
					<p>Let the Bar raise</p>
		</div>
        </div>
    );
}
export default RecipePage;