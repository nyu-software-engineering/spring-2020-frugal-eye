import React from 'react';
import './NavBar.css'

const NavBar = (props) => {

    return (
    // <div>
    //    <div className="navbar">
    //         <ul className="nav">
    //             <li><a href="/home">Home</a></li>
    //             <li><a href="/add-ingredients">Input Ingredients</a></li>
    //             <li><a href="/favoritelist">Favorites</a></li>
    //             <li className="title">Sprouts</li>
    //         </ul>
    //     </div>
        <div id="centeredmenu">
            <div className="title2">Sprouts</div>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/add-ingredients">Input Ingredients</a></li>
                <li><a href="/favoritelist">Favorites</a></li>
            </ul>
        </div>
    // </div>
    );
  }
  export default NavBar;