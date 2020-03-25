import React from 'react';  
import './popup.css';  

const Popup = (props) => {   
	return (  
		<div className='popup'>  
		<h1>{props.text}</h1>  
		<button onClick={props.closePopup}>Ok</button>  
		</div>    
	);   
}  
export default Popup;