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

  	<div class = "flex-container">
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