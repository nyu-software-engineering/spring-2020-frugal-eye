import React from 'react';  
import './popup.css';  
import '../standard.css';

const Popup = (props) => {   
	return (  
		<div className='popup'>
		<h1>{props.text}</h1>
		<button id="okButton" className="standard_button" onClick={props.closePopup}>Ok</button>
		</div>    
	);   
}  
export default Popup;