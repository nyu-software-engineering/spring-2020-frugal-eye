import React, {useState} from 'react';
import './RecipeList.css'
import Popup from './components/Popup';

const RecipeList = (props) => {

  const [matchPopup, setMatchPopup] = useState(true);

  return (

    //retrieve search params from props
    //.find({ingredients = props.ingredients}, ingredients)
    //for {ingredient} in {ingredients}

    //where props.action is sending to specific recipe page with param = recipe selected
  	<div class = "flex-container">
      {matchPopup ? <Popup id = 'instructions' 
        text='Hi! Looks like this is your first time viewing recipes. The ones in green are those that you have all ingredients for, yellow are those you have some for.' 
        closePopup={(h) => setMatchPopup(!matchPopup)} /> : null}
      <p className = "recipe" onClick={props.action}> 
        Recipe Name
        <img src = {require("./potpie.jpg")} alt = "image"/>
      </p>
    </div>
  )
}

export default RecipeList;