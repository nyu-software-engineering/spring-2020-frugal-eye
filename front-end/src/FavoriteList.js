import React, {useState} from 'react';
import './RecipeList.css'
import NavBar from './NavBar';
import Popup from './components/Popup';
import './register.css'

const FavoriteList = (props) => {

  const [matchPopup, setMatchPopup] = useState(true);
  const data = require("./Sampledata");
  return (

    //retrieve search params from props
    //.find({ingredients = props.ingredients}, ingredients)
    //for {ingredient} in {ingredients}

    //where props.action is sending to specific recipe page with param = recipe selected
    <div>
      <NavBar/>
      <div class = "flex-container">
          <br></br>
        {matchPopup ? <Popup id = 'instructions' 
          text='Hi! Looks like this is your first time viewing recipes. The ones in green are those that you have all ingredients for, yellow are those you have some for.' 
          closePopup={(h) => setMatchPopup(!matchPopup)} /> : null}
        {Object.keys(data).map((key, index) => {
          if(data[key].favorite){
            return(
              <p className = 'recipe' onClick={event => window.location.href="/recipe/"+key}>
              {data[key].name}
              <img src = {require("" + data[key].image)} alt = 'image'/>
              </p>
            )
          }else return "";
        })}

      </div>
    </div>
  )
}

export default FavoriteList;