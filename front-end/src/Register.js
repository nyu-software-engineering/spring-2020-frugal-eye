import React, { useState } from 'react';
import './register.css';
import './standard.css';
const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    let payload = {
    	"username": username,
    	"password": password
    }
    console.log(payload)
    {props.closeWindow()}
  }

  return (
  	<div className='register'>
    	<form onSubmit={handleSubmit}>
    	<p>Register</p>
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
    	</div>
  );
}
export default Register;