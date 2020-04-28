import React, { useState } from 'react';
import { useParams } from "react-router";
import Popup from './components/Popup';
import NavBar from './NavBar';
import axios from 'axios';
import './recipepage.css'

const RecipePage = (props) => {
    const [matchPopup, setMatchPopup] = useState(true);
    const [dat, setData] = useState([]);

    const data = require("./Sampledata2");
    let {key} = useParams();

    let id = 716429;
    let apikey = "097d255cf08b43c38036c60fb487d129";
    //let id = parseInt(useParams());
    let url = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + apikey;
    //let {recipeName} = data[id].name;

    let Recipe = {
        id: Number,
        recipe_name: String,
    };

    let useEffect = function(){
        async function getID() {
            const result = await axios(url);
            setData(result.dat);
            alert(dat.id);
        }

        getID();
    }

    //alert(dat.id);

    useEffect();
    

    // let getJSON = function(url, callback) {

    //     let xhr = new XMLHttpRequest();
    //     xhr.open('GET', url, true);
    //     xhr.responseType = 'json';
        
    //     xhr.onload = function() {
        
    //         var status = xhr.status;
            
    //         if (status == 200) {
    //             callback(null, xhr.response);
    //         } else {
    //             callback(status);
    //         }
    //     };
        
    //     xhr.send();
    // };

    // getJSON(url,  function(err, data) {
    //     Recipe.id = data.id;
    //     Recipe.recipe_name = data.title;
    //     alert(Recipe.recipe_name);
    // });



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
        //alert("favorited");
        return;
    }
    //onclick the name of the recipe from the recipelist will store the name in props and load this page
    //name = props.recipeName
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <br></br>
            <button className="recipes-button" onClick={event => window.location.href='/recipelist'}>Back to recipes</button>
            <br></br><br></br>
            <div className = "recipe2">
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