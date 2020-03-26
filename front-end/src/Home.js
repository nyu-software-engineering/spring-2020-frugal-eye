import React from 'react';
import './standard.css'
import './Home.css'
const Home = (props) => {

  return (
  	<div className="home">
  	<h1>Home</h1>
    	<button className="standard_button" onClick={event => window.location.href='/add-ingredients'}>Input Ingredients</button>
      <p></p>
      <button className="standard_button" onClick={event => window.location.href='/favoritelist'}>View Favorites</button>
      <p></p>
      <button className="standard_button" onClick={event => window.location.href='/settings'}>Settings</button>
    </div>
  );
}
export default Home;