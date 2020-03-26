import React, { useState } from 'react';
import Popup from './components/Popup';
import './standard.css'
const Settings = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopupAct, setShowPopupAct] = useState(false);
    const [showPopupDel, setShowPopupDel] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        var payload = {
            "username": username,
            "password": password
        }
        console.log(payload)
        setShowPopupAct(true)
        console.log(showPopupAct)
    }

    return (
      <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <p>Change Login Information</p>
            <label>
                <input className="standard_input" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
            </label>
            <p></p>
            <label>
                <input className="standard_input" type="password" value={password} onChange={f => setPassword(f.target.value)} placeholder="Password"/>
            </label>
            <p></p>
            <input className="standard_button" type="submit" value="Change" />
        </form>
        <p></p>
        {showPopupAct ?
        <Popup  
            text='Account information has been changed' 
            closePopup={t => setShowPopupAct(!showPopupAct)}  
        />
        :
        null
        }  
        <button className="standard_button" onClick={h => setShowPopupDel(!showPopupDel)}>Clear Favorites</button>
        {showPopupDel ?
        <Popup  
            text='Favorite recipes have been cleared' 
            closePopup={g => setShowPopupDel(!showPopupDel)}  
        />
        :
        null
        }
        <p></p>
        <button className="standard_button" onClick={event => window.location.href='/'}>Log Out</button>

      </div>
    );

}
export default Settings;
  