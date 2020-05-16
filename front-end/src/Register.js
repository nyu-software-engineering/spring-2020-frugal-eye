import React, { useState } from 'react';
import './register.css';
import './standard.css';
import Popup from './components/Popup';
import axios from 'axios';

const Register = (props) => {
  const [new_username, setUsername] = useState("");
  const [new_password, setPassword] = useState("");
  const [lengthPopup, setLengthPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [alreadyRegisteredPopup, setAlreadyRegisteredPopup] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let payload = {
      "new_username": new_username,
      "new_password": new_password
    }
    axios.post('http://localhost:8080/register', payload).then(function (response) {
      console.log(response);
      if(response.status == 200){
        {props.closeWindow()}
      }
      else if(response.status == 204){
        setLengthPopup(true);
      } 
      else if(response.status == 205){
        setAlreadyRegisteredPopup(true);
      }
      else{
        setErrorPopup(true)
      }
    }).catch(function (error) {
      console.log(error);
      setErrorPopup(true);
    });
  }

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
        <label>
            <input className="standard_input" type="text" value={new_username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
        </label>
        <br></br><br></br>
        <label>
            <input className="standard_input" type="password" value={new_password} onChange={f => setPassword(f.target.value)} placeholder="Password"/>
        </label>
        <p></p>
        <input className="standard_button" type="submit" value="Sign up!" />
        <button className="standard_button" onClick={props.closeWindow}>Go back</button>
      </form>
        {lengthPopup ?
        <Popup  
            text='Password must be at least 8 characters' 
            closePopup={h => setLengthPopup(!lengthPopup)}  
        />
        :
        null
        }
         {alreadyRegisteredPopup ?
        <Popup  
            text='Error: User is already registered' 
            closePopup={j => setAlreadyRegisteredPopup(!alreadyRegisteredPopup)}  
        />
        :
        null
        }
          {errorPopup ?
        <Popup  
            text='Error creating user profile' 
            closePopup={i => setErrorPopup(!errorPopup)}  
        />
        :
        null
        }
      </div>
  );
}
export default Register;