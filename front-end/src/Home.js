import React from 'react';
import './standard.css'
import './Home.css'
import NavBar from './NavBar'
const Home = (props) => {

  return (
  	<div className="home">
      <NavBar/>
      <br></br>
      <h1>Home</h1>
      <div className="intro">
        <p>Sprouts is an application designed to help individuals figure out what they can cook with leftover ingredients in their refrigerator.</p>
        <p>Users are required to input ingredients that are currently in their fridge to generate easy-to-follow recipes using those specific ingredients.</p>
        <p>Users can choose what they want to cook from a variety of recipes and can also favorite recipes that they loved or would like to try making in the future.</p>
      </div>
      <br></br>
    	<button className="standard_button" onClick={event => window.location.href='/add-ingredients'}>Input Ingredients</button>
      <p></p>
      <button className="standard_button" onClick={event => window.location.href='/favoritelist'}>View Favorites</button>
      <p></p>
      <button className="standard_button" onClick={event => window.location.href='/settings'}>Settings</button>
    </div>
  );
}
export default Home;