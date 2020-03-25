import React, { useState } from 'react';
import Register from './Register';
const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  function handleSubmit(event) {
    alert('Username: ' + username + ', password: ' + password);
    event.preventDefault();
    let payload = {
    	"username": username,
    	"password": password
    }
  }

  return (
  	<div>
    	<form onSubmit={handleSubmit}>
    	<p>Sprouts</p>
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
        <p></p>
        <button onClick={g => setShowRegister(!showRegister)}>Register</button>  
        {showRegister ?  
        <Register
          closeWindow={t => setShowRegister(!showRegister)}  
        />  
        : null  
        }
    	</div>
  );
}
export default Login;