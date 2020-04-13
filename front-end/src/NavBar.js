import React from 'react';
import './NavBar.css'

const NavBar = (props) => {

    return (
        <div id="centeredmenu">
           <span className="title">Sprouts</span>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/add-ingredients">Input Ingredients</a></li>
                <li><a href="/favoritelist">Favorites</a></li>
            </ul>
        </div>
    );
  }
  export default NavBar;