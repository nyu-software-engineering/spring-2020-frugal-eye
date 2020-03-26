import React, { useState } from 'react';
import { useParams } from "react-router";
import Popup from './components/Popup';
import './recipepage.css'
const RecipePage = (props) => {
    const [matchPopup, setMatchPopup] = useState(true);
    const data = require("./Sampledata");
    let {key} = useParams();

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
                <img src = {require("" + data[key].image)} width="200" alt = 'image'/>
                <h3>{data[key].name}</h3>
                <button onClick={null}>Add to Favorites</button>
                <p>Ingredients:</p>
                <ul>
                    {data[key].ingredients.map(ingredient => (
                        <li>{ingredient}</li>
                    ))}     
                </ul>
                <p>Instructions:</p>
                <ul>
                    <li>Cut the Foo</li>
					<li>Break the Baz</li>
					<li>Let the Bar raise</li>
                </ul>
            </div>
        </div>
    );
}
export default RecipePage;