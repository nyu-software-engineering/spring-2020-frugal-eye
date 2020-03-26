import React, { useState } from 'react';
import Register from './Register';
import Popup from './components/Popup';
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
    if(username === "goodUser"){
      window.location.href='/Home'
    }
    else if(username === "badUser"){
      setMatchPopup(true)
    }
    else{
      setExistPopup(true)
    }
  }

  return (
  	<div>
    	<form onSubmit={handleSubmit}>
    	<h1>Sprouts</h1>
      	<label>
       	Username:
        		<input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      	</label>
      	<br></br><br></br>
      	<label>
       	Password:
        		<input type="password" value={password} onChange={f => setPassword(f.target.value)} />
      	</label>
      	<input type="submit" value="Go!" />
        </form>
        <br></br>
        <button onClick={g => setShowRegister(!showRegister)}>Register</button>  
        {showRegister ?  
        <Register
          closeWindow={t => setShowRegister(!showRegister)}  
        />  
        : null  
        }
        {matchPopup ?
        <Popup  
            text='Username and password do not match' 
            closePopup={h => setMatchPopup(!matchPopup)}  
        />
        :
        null
        }
        {existPopup ?
        <Popup  
            text='Username does not exist' 
            closePopup={i => setExistPopup(!existPopup)}  
        />
        :
        null
        }
    	</div>
  );
}
export default Login;