import React, {useState} from 'react';
import './RecipeList.css'
import Popup from './components/Popup';
import './register.css'

const RecipeList = (props) => {

  const [matchPopup, setMatchPopup] = useState(true);
  const data = require("./Sampledata");
  return (

    //retrieve search params from props
    //.find({ingredients = props.ingredients}, ingredients)
    //for {ingredient} in {ingredients}

    //where props.action is sending to specific recipe page with param = recipe selected

    //onclick props will store the name of the recipe from the recipelist to props.recipeName and load recipe page
  	<div className = "flex-container">
      <button className="back-button" onClick={event => window.location.href='/home'}>Back to home</button>
      <br></br>
      <button className="ingr-button" onClick={event => window.location.href='/add-ingredients'}>Back to ingredients</button>
      <br></br>
      <h2>Recipes</h2>
      {matchPopup ? <Popup id = 'instructions' 
        text='Hi! Looks like this is your first time viewing recipes. The ones in green are those that you have all ingredients for, yellow are those you have some for.' 
        closePopup={(h) => setMatchPopup(!matchPopup)} /> : null}
      {Object.keys(data).map((key, index) => {
        return(
          <p className = 'recipe' onClick={null}>
          {data[key].name}
          <img src = {require("" + data[key].image)} alt = 'image'/>
          </p>
        )
      })}
    </div>
  )
}

export default RecipeList;