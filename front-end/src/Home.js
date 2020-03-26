import React from 'react';
const Home = (props) => {

  return (

  	<div>
  	  <br></br><br></br>
    	<button onClick={event => window.location.href='/add-ingredients'}>Input Ingredients</button>
      <br></br>
      <br></br>
      <button onClick={event => window.location.href='/recipelist'}>View Favorites</button>
      <br></br>
      <br></br>
      <button onClick={event => window.location.href='/Settings'}>Settings</button>
    </div>
  );
}
export default Home;