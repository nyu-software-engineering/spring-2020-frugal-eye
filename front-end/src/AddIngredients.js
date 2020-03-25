import React, { useState } from 'react';
import './AddIngredients.css';

const AddIngredients = (props) =>{
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        alert("You've added " + ingredient);
        setIngredientsList(ingredientsList.concat(ingredient));
        console.log(ingredientsList);
    }

    return (
        <div>
            <h1>What's in your fridge?</h1>
            <div className="display-ingredients">
                <ul>
                    {ingredientsList.map(ingredients => (
                        <li key={ingredients}>{ingredients}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <br></br>Input your ingredients:<br></br>
                <input type="text" value={ingredient} onChange={e => setIngredient(e.target.value)}/>
                <br></br><input type="submit" value="Add"/>
                
            </form>
        </div>
    );
}
export default AddIngredients;