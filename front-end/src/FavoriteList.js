import React, {useState, useEffect} from 'react';
import './RecipeList.css'
import Popup from './components/Popup';
import './register.css';
import NavBar from "./NavBar.js"
import axios from 'axios'

const FavoriteList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/favoritelist').then(function(response) {
            setData(response.data);
    });
  }, []);
  return (

    //retrieve search params from props
    //.find({ingredients = props.ingredients}, ingredients)
    //for {ingredient} in {ingredients}

    //where props.action is sending to specific recipe page with param = recipe selected

  	<div className = "flex-container">
    <NavBar/>
      <br></br>
      <p id = "help-text">If the box is green, you're all set! If it's yellow, you're missing some ingredients.</p>
      <br></br>
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
  )
}

export default FavoriteList;