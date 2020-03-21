import React from 'react';  
import './popup.css';  

class Popup extends React.Component {  
  	render() {  
		return (  
			<div className='popup'>  
			<h1>{this.props.text}</h1>  
			<button onClick={this.props.closePopup}>Ok</button>  
			</div>    
		);  
	}  
}  
export default Popup;