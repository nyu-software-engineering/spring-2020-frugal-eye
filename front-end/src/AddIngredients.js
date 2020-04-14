import React, { useState, useEffect} from 'react';
import NavBar from './NavBar';
import './AddIngredients.css';
import './standard.css';
import axios from 'axios';

const AddIngredients = (props) =>{
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        setIngredientsList(ingredientsList.concat(ingredient));
        setIngredient("");
    }
    useEffect(() => {
        axios.post('http://localhost:3000/add-ingredients', ingredientsList).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    });
    function handleChange(event) {
        setIngredient(event.target.value)
    }
    function handleDelete(event) {
        event.preventDefault();
        let item = event.target.id;
        setIngredientsList(ingredientsList.filter((e) => (e !== item)));
    }
    return (
        <div>
            <NavBar/>
            <br></br>
            <h1>What's in your fridge?</h1>
            <div className="display-ingredients">
                <ul>
                    {ingredientsList.map(ingredients => (
                        <div className="each-ingredient">
                            <li key={ingredients}>
                                {ingredients}
                                <div className="features"><button id={ingredients} onClick={handleDelete}>del</button></div>
                            </li>
                        </div>
                    ))}     
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <br></br>Input your ingredients: <br></br>
                <p></p>
                <input className="ing_input" type="text" name="ingredientInput" value={ingredient} onChange={handleChange} required/>
                <input className="ing_array" type="text" name="ingredientArray" value={ingredientsList}/>
                <input className="ing_button" type="submit" value="Add"/>
            </form>
            <br></br>
            <button className="rec_button" onClick={event => window.location.href='/recipelist'}>Let's view some recipes!!</button>
        </div>
    );
}
export default AddIngredients;
