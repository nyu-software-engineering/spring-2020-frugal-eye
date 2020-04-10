import React from 'react';
import './NavBar.css'

const NavBar = (props) => {

    return (
       <div className="navbar">
            <ul className="nav">
                <li><a href="/home">Home</a></li>
                <li><a href="/add-ingredients">Input Ingredients</a></li>
                <li><a href="/favoritelist">Favorites</a></li>
                <li className="title">Sprouts</li>
            </ul>
        </div>
      
    );
  }
  export default NavBar;