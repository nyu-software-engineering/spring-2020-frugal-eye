import React, {useState, useEffect} from 'react';
import './RecipeList.css'
import Popup from './components/Popup';
import './register.css';
import NavBar from "./NavBar.js"
import axios from 'axios'

const FavoriteList = (props) => {
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3000/favoritelist', {
        headers: { Authorization: token }}).then(function(response) {
          console.log(response.data.data);
          setData(response.data.data);
    });
  }, []);

  if (token == null)
        { window.location.href='/' }
  
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
      {data.map((key, index) => (
          <p className = {data[index].missedIngredientCount > 0 ? 'yellowrecipe' : 'greenrecipe'} onClick={event => window.location.href="/recipe/"+key}>
          {data[index].title}
          <img src = {data[index].image} alt = 'image'/>
          </p>
      ))}
    </div>
  )
}

export default FavoriteList;