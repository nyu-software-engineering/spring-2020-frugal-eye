import React from 'react';
import './standard.css'
import './Home.css'
import NavBar from './NavBar'
const Home = (props) => {

  return (
  	<div className="home">
       <NavBar/>
       <br></br><h1>Home</h1><br></br>

      <p></p>
    	<button className="standard_button" onClick={event => window.location.href='/add-ingredients'}>Input Ingredients</button>
      <p></p>
      <button className="standard_button" onClick={event => window.location.href='/favoritelist'}>View Favorites</button>
      <p></p>
      <button className="standard_button" onClick={event => window.location.href='/settings'}>Settings</button>
    </div>
  );
}
export default Home;