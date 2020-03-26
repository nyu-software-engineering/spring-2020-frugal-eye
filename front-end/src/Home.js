import React from 'react';
const Home = (props) => {

  return (
  	<div>
    	<button onClick={event => window.location.href='/add-ingredients'}>Input Ingredients</button>
      <p></p>
      <button onClick={event => window.location.href='/Favorites'}>View Favorites</button>
      <p></p>
      <button onClick={event => window.location.href='/Settings'}>Settings</button>
    </div>
  );
}
export default Home;