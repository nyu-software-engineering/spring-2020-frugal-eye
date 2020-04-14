import React, { useState } from 'react';
import { useParams } from "react-router";
import Popup from './components/Popup';
import NavBar from './NavBar';
import axios from 'axios';
import './recipepage.css'
const RecipePage = (props) => {
    const [matchPopup, setMatchPopup] = useState(true);
    const data = require("./Sampledata");
    let {key} = useParams();

    let id = parseInt(useParams());
    //let {recipeName} = data[id].name;

   function favorited(){

        axios.post('http://localhost:3000/recipe').then(function (response) {
        console.log(response);
        if(response.status == 200){
            alert("Added to Favorites");
        }
        }).catch(function (error) {
            console.log(error);
        });

		if(data[key].favorite == false){
			data[key].favorite = true;
		}
		else{
			data[key].favorite = false;
		}
		alert(data[key].favorite);
		return;
    }
    //onclick the name of the recipe from the recipelist will store the name in props and load this page
    //name = props.recipeName
    return(
        <div>
            <NavBar/>
            <br></br>
            <button className="recipes-button" onClick={event => window.location.href='/recipelist'}>Back to recipes</button>
            <br></br><br></br>
            <div className = "recipe">
                <img src = {require("" + data[key].image)} width="200" alt = 'image'/>
                <h3>{data[key].name}</h3>
                <button onClick={favorited}>Add to Favorites</button>
                <p>Ingredients:</p>
                <ul>
                    {data[key].ingredients.map(ingredient => (
                        <li>{ingredient}</li>
                    ))}     
                </ul>
                <p>Instructions:</p>
                <ul>
                    {data[key].instructions.map(instruction => (
                        <li>{instruction}</li>
                    ))}   
                </ul>
            </div>
        </div>
    );
}
export default RecipePage;