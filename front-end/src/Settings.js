import React, { useState } from 'react';
import Popup from './components/Popup';
const Settings = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPopupAct, setShowPopupAct] = useState(false);
    const [showPopupDel, setShowPopupDel] = useState(false);

    function handleSubmit(event) {
        alert('Username: ' + username + ', password: ' + password);
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
      <p>Settings</p>
      <form onSubmit={handleSubmit}>
        <p>Change Login Information</p>
            <label>
            Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <p></p>
            <label>
            Password:
                <input type="password" value={password} onChange={f => setPassword(f.target.value)} />
            </label>
            <p></p>
            <input type="submit" value="Change" />
        </form>
        {showPopupAct ?
        <Popup  
            text='Account information has been changed' 
            closePopup={t => setShowPopupAct(!showPopupAct)}  
        />
        :
        null
        }  
        <button onClick={h => setShowPopupDel(!showPopupDel)}>Clear Favorites</button>
        {showPopupDel ?
        <Popup  
            text='Favorite recipes have been cleared' 
            closePopup={g => setShowPopupDel(!showPopupDel)}  
        />
        :
        null
        }
        <p></p>
        <button onClick={event => window.location.href='/'}>Log Out</button>

      </div>
    );

}
export default Settings;
  