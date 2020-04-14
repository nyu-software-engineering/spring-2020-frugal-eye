import React, { useState } from 'react';
import Register from './Register';
import Popup from './components/Popup';
import './standard.css'
import './Login.css'
import axios from 'axios';
const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [matchPopup, setMatchPopup] = useState(false);
  const [existPopup, setExistPopup] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let payload = {
      "username": username,
      "password": password
    }
    axios.post('http://localhost:3000/', payload).then(function (response) {
      console.log(response);
      if(response.status == 200){
        window.location.href='/Home'
      }
      else if(response.status == 204){
        setMatchPopup(true)
      }
      else{
        setExistPopup(true)
      }
   }).catch(function (error) {
    console.log(error);
  });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="name">Sprouts <img className="pic" src={require("./sprout-icon.png")} alt = 'image'/></h1> 
        <label> 
            <input className="standard_input" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
        </label>
        <p></p>
        <label> 
            <input className="standard_input" type="password" value={password} onChange={f => setPassword(f.target.value)} placeholder="Password"/>
        </label>
        <p></p>
        <input className="standard_button" type="submit" value="Go!" />
        </form>
        <p></p>
        <button className="standard_button" onClick={g => setShowRegister(!showRegister)}>Register</button>  
        {showRegister ?  
        <Register
          closeWindow={t => setShowRegister(!showRegister)}  
        />  
        : null  
        }
        {matchPopup ?
        <Popup className="popup"  
            text='Username and password do not match' 
            closePopup={h => setMatchPopup(!matchPopup)}  
        />
        :
        null
        }
        {existPopup ? 
        <Popup classname='popup'>
          Username does not exist 

        </Popup>
        : null}
        {/* {existPopup ?
        <Popup className="popup"  
            text='Username does not exist' 
            closePopup={i => setExistPopup(!existPopup)}  
        />
        :
        null
        } */}
      </div>
  );
}
export default Login;