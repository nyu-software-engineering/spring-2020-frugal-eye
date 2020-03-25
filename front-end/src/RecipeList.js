import React, {Component} from 'react';


const RecipeList = (props) => {
  
  return (
  	<div>
    <p onClick={props.action}>
      {props.name} 
      <img src = "somepic.png"/>
    </p>
  </div>
  )
}

export default RecipeList;