import React, { useState } from 'react';
import './AddIngredients.css';

const AddIngredients = (props) =>{
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        setIngredientsList(ingredientsList.concat(ingredient));
        setIngredient("");
        console.log(ingredientsList);
    }
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
            <button className="back-button" onClick={event => window.location.href='/home'}>Back to home</button>
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
                <br></br>Input your ingredients:<br></br>
                <input type="text" name="ingredientInput" value={ingredient} onChange={handleChange}/>
                <br></br><input type="submit" value="Add"/>
            </form>
        </div>
    );
}
export default AddIngredients;