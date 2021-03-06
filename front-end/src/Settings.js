import React, { useState } from 'react';
import Popup from './components/Popup';
import './standard.css';
import axios from 'axios';
import NavBar from './NavBar.js'

const Settings = (props) => {
    const [username, setUsername] = useState("");
    const [new_username, setNewUsername] = useState("");
    const [password, setPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [showPopupAct, setShowPopupAct] = useState(false);
    const [showPopupDel, setShowPopupDel] = useState(false);
    const [lengthPopup, setLengthPopup] = useState(false);
    const [existPopup, setExistPopup] = useState(false);
    const [wrongPopup, setWrongPopup] = useState(false);
    const [alreadyPopup, setAlreadyPopup] = useState(false);

    const token = window.localStorage.getItem('token');

    function handleSubmit(event) {
        event.preventDefault();
        var payload = {
            "username": username,
            "new_username": new_username,
            "password": password,
            "new_password": new_password
        }
        axios.post('http://localhost:8080/settings', payload, {
        headers: { Authorization: token }}).then(function (response) {
        console.log(response);
        if(response.status == 200){
            setShowPopupAct(true)
        }
        else if(response.status == 204){
            setLengthPopup(true)
        }
        else if(response.status == 205){
            setExistPopup(true)
        }
        else if(response.status == 206){
            setWrongPopup(true)
        }
        else if(response.status == 207){
            setAlreadyPopup(true)
        }
        }).catch(function (error) {
            console.log(error);
        });
        
    }

    function handleLogOut(event){
        //clear jwt from local storage
        window.localStorage.clear()
        { window.location.href='/' }
    }

    function handleClear(event){
        setShowPopupDel(!showPopupDel);
        axios.get('http://localhost:8080/clearfav', {
        headers: { Authorization: token }
    });
    }

    if (token == null)
        { window.location.href='/' }

    return (
      <div>
          <NavBar/>
        <br></br><br></br>
        <h1>Settings</h1>
        <form onSubmit={handleSubmit}>
            <h4>Change Login Information</h4>
                <label>
                    <input className="standard_input" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
                </label>
                <br></br>
                <br></br>
                <label>
                    <input className="standard_input" type="text" value={new_username} onChange={e => setNewUsername(e.target.value)} placeholder="New Username"/>
                </label>
                <br></br>
                <br></br>
                <label>
                    <input className="standard_input" type="password" value={password} onChange={f => setPassword(f.target.value)} placeholder="Password"/>
                </label>
                <br></br>
                <br></br>
                <label>
                    <input className="standard_input" type="password" value={new_password} onChange={f => setNewPassword(f.target.value)} placeholder="New Password"/>
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
            {lengthPopup ?
            <Popup  
                text='Password must be at least 8 characters' 
                closePopup={h => setLengthPopup(!lengthPopup)}  
            />
            :
            null
            }
            {existPopup ?
            <Popup className="popup"  
                text='Username does not exist' 
                closePopup={i => setExistPopup(!existPopup)}  
            />
            :
            null
            }
            {wrongPopup ?
            <Popup  
                text='Incorrect password' 
                closePopup={k => setWrongPopup(!wrongPopup)}  
            />
            :
            null
            }
            {alreadyPopup ?
            <Popup  
                text='You cannot set this as your username, it already exists' 
                closePopup={y => setAlreadyPopup(!alreadyPopup)}  
            />
            :
            null
            }
            <button className="standard_button" onClick={handleClear}>Clear Favorites</button>
            {showPopupDel ?
            <Popup  
                text='Favorite recipes have been cleared' 
                closePopup={g => setShowPopupDel(!showPopupDel)}  
            />
            :
            null
            }
            <p></p>
            <button className="standard_button" onClick={handleLogOut}>Log Out</button>

      </div>
    );

}
export default Settings;