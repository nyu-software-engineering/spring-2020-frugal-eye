import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import Popup from './components/Popup';
import NavBar from './NavBar';
import axios from 'axios';
import './recipepage.css'

const RecipePage = (props) => {
    
    const [data, setData] = useState([]);
    const [instr, setInstr] = useState([]);
    const [matchPopup, setMatchPopup] = useState(true);

    const dat = require("./Sampledata2");
    let {key} = useParams();

    let id = 716429;
    let apikey = "7c8a8fa894364cee819710b8b1887a74";
    //let id = parseInt(useParams());
    let ingredientsurl = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + apikey;
    let instructionsurl = "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?apiKey=" + apikey;
    //let {recipeName} = data[id].name;

    useEffect(() => {
        axios.get(ingredientsurl).then(function(response) {
            console.log(response);
            setData(response.data);
        }).catch(error => {
            console.log(error);
        });
            axios.get(instructionsurl).then(function(response) {
                setInstr(response.data);
            }).catch(error => {
            console.log(error);
        });
//        }, []);
    }, []);
 

    let Recipe = {
        id: Number,
        recipe_name: String,
        ingredients: [Object],
//        instructions: [String]
    };

        Recipe.id = data.id;
        Recipe.recipe_name = data.title;
        Recipe.ingredients = data.extendedIngredients;
    try{
        alert(data.extendedIngredients)
    }
    catch{

    }

    function ingredients(){
        if(data != undefined){}
            return(
                <ul>
                    {data.ingredients.map(ingredient => (
                        <li>{ingredient}</li>
                    ))}   
                </ul>
            )
        else{
            return ();
        }
    }

    function ingredients(){
        if(data != undefined){}
            return(
                <ul>
                    {instr.map(instruction => (
                    <li>{instruction}</li>
                    ))}   
                </ul>
            )
        else{
            return ();
        }
    }

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
                <img src = {require("" + dat[key].image)} width="200" alt = 'image'/>
                <h3>{Recipe.recipe_name}</h3>
                <button onClick={favorited}>Add to Favorites</button>
                <p>Ingredients:</p>
                {this.ingredients()}
                <p>Instructions:</p>
                {this.instructions()}
            </div>
        </div>
    );
}
export default RecipePage;