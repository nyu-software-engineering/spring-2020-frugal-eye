import React, {useState, useEffect} from 'react';
import './RecipeList.css'
import Popup from './components/Popup';
import NavBar from './NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './register.css'
import axios from 'axios'
const RecipeList = (props) => {
  const [data, setData] = useState([]);

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3000/favoritelist', {
        headers: { Authorization: token }}).then(function(response) {
            setData(response.data);
    });
  }, []);

  if (token == null)
        { window.location.href='/' }
  
  return (
    //retrieve search params from props
    //.find({ingredients = props.ingredients}, ingredients)
    //for {ingredient} in {ingredients}
    //where props.action is sending to specific recipe page with param = recipe selected
    //onclick the name of the recipe from the recipelist will store the name in props and load recipe page
    <div className = "flex-container">
      <NavBar/>
      <br></br>
      <p id = "help-text">If the box is green, you're all set! If it's yellow, you're missing some ingredients.</p>
      <br></br>
      {Object.keys(data).map((key, index) => {
        return(
          <p className = 'recipe' onClick={event => window.location.href="/recipe/"+key}>
          {data[key].name}
          <img src = {require("" + data[key].image)} alt = 'image'/>
          </p>
        )
      })}
    </div>
  )
}
export default RecipeList;