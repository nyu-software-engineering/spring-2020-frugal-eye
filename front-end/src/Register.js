import React, { useState } from 'react';
import './register.css';
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
       	Username:
        		<input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      	</label>
      	<p></p>
      	<label>
       	Password:
        		<input type="password" value={password} onChange={f => setPassword(f.target.value)} />
      	</label>
      	<input type="submit" value="Go!" />
    	</form>
    	</div>
  );
}
export default Register;