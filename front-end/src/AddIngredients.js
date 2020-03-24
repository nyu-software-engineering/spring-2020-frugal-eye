import React, { useState } from 'react';
import './AddIngredients.css';

const AddIngredients = (props) =>{
    const [ingredient, setIngredient] = useState("");

    function handleSubmit(event) {
        alert("You've added " + ingredient);
        event.preventDefault();
    }

    return (
        <div>
            <h1>What's in your fridge?</h1>
            <div id="display-ingredients">
            </div>
            <form onSubmit={handleSubmit}>
                <p>Input your ingredients:</p>
                <input type="text" value={ingredient} onChange={e => setIngredient(e.target.value)}/>
                <br></br><input type="submit" value="Add"/>
                
            </form>
        </div>
    );
}
export default AddIngredients;