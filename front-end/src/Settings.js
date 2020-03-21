import React, {Component} from 'react';
import Popup from './components/Popup';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPopupAct: false,
            showPopupDel: false
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteRecipes = this.deleteRecipes.bind(this);
    }
    handleChangeUser(event) {
        this.setState({username: event.target.value});
    }

    handleChangePass(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        alert('Username: ' + this.state.username + ', password: ' + this.state.password);
        event.preventDefault();
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        console.log(payload)
        this.setState({showPopupAct: true});
    }

    deleteRecipes(event) {
        this.setState({showPopupDel: true});
    }

    closePopupAct() {  
        this.setState({  
             showPopupAct: false 
        });  
    }

    closePopupDel() {  
        this.setState({  
             showPopupDel: false 
        });  
    }

    render() {
        return (
          <div>
          <p>Settings</p>
          <form onSubmit={this.handleSubmit}>
            <p>Change Login Information</p>
                <label>
                Username:
                    <input type="text" value={this.state.username} onChange={this.handleChangeUser} />
                </label>
                <p></p>
                <label>
                Password:
                    <input type="password" value={this.state.password} onChange={this.handleChangePass} />
                </label>
                <p></p>
                <input type="submit" value="Change" />
            </form>
            {this.state.showPopupAct ?
            <Popup  
                text='Account information has been changed' 
                closePopup={this.closePopupAct.bind(this)}  
            />
            :
            null
            }  
            <button onClick={this.deleteRecipes}>Clear Favorites</button>
            {this.state.showPopupDel ?
            <Popup  
                text='Favorite recipes have been cleared' 
                closePopup={this.closePopupDel.bind(this)}  
            />
            :
            null
            }
            <p></p>
            <button onClick={event => window.location.href='/Login'}>Log Out</button>

          </div>
        );
    }

}
export default App;
  