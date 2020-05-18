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

    const token = window.localStorage.getItem('token');

    let {key} = useParams();

    // let id = 716429;
    // let id2 = 324694;
    let apikey = "3e3092cf2a5d4d5483dbdf38e81f646f";
    //let id = parseInt(useParams());
    let ingredientsurl = "https://api.spoonacular.com/recipes/" + key + "/information?apiKey=" + apikey;
    let instructionsurl = "https://api.spoonacular.com/recipes/" + key + "/analyzedInstructions?apiKey=" + apikey;
    //let {recipeName} = data[id].name;

    useEffect(() => {
        axios.get(ingredientsurl).then(function(response) {
            console.log(response.data.image)
            setData(response.data);
        }).catch(error => {
            console.log(error);
        }, []);
            axios.get(instructionsurl).then(function(response) {
                console.log(response.data);
                setInstr(response.data);
        }).catch(error => {
            console.log(error);
        }, []);
    }, []);
 
    let Recipe = {
        id: data.id,
        title: data.title,
        image: data.image
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/recipe', Recipe, {
        headers: { Authorization: token }}).then(function (response){
            console.log(response);
        }).catch(function (error) {
            console.log(error);
          });
        
    }

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function ingredients(){
        if(data.length != 0){
            return(
                <div>
                    <ul className="recipeul">{data.extendedIngredients.map(ingredient => (
                        <li className="recipeli" key={ingredient.id}>{Capitalize(ingredient.name)}</li>
                     ))}  
                     </ul>
                </div>
            );
        }
        else{
            return;
        }
    }

    function instructions(){
        if(instr.length != 0){
            console.log(instr)
            return(
                <div>
                    {instr.map((instruction, i) => {
                        return(
                        <div>
                            <h4>{instruction.name}</h4>    
                            <ol key={i}>{instruction.steps.map(step => ( 
                                <li key={step.number}>{step.step}</li>
                            ))}
                            </ol>
                        </div> 
                        )
                    })}   
                </div>
            );
        }
        else{
            return ;
        }
    }

    //onclick the name of the recipe from the recipelist will store the name in props and load this page
    //name = props.recipeName

    if (token == null)
        { window.location.href='/' }
        
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <br></br>
            <button className="recipes-button" onClick={event => window.location.href='/recipelist'}>Back to Recipes</button>
            <div className = "recipe2">
                <h3>{data.title}</h3>
                <img className="img" src = {data.image} alt = 'image'/>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="Recipe" value={Recipe}/>
                    <input className="recipes-button" type="submit" value="Add to Favorites"/>
                </form>
                <h4>Ingredients:</h4>
                {ingredients()}
                <h4>Instructions:</h4>
                {instructions()}
            </div>
        </div>
    );
}
export default RecipePage;