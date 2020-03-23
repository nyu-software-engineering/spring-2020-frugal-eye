import React, {Component} from 'react';
import Register from './Register';
class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	username: '',
    	password: '',
    	showRegister: false};

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerForm = this.registerForm.bind(this);
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
    let payload = {
    	"username": this.state.username,
    	"password": this.state.password
    }
    console.log(payload)
  }

  registerForm() {
  	this.setState({showRegister: !this.state.showRegister});
  }

  render() {
    return (
    	<div>
      	<form onSubmit={this.handleSubmit}>
      	<p>Sprouts</p>
        	<label>
         	Username:
          		<input type="text" value={this.state.username} onChange={this.handleChangeUser} />
        	</label>
        	<p></p>
        	<label>
         	Password:
          		<input type="password" value={this.state.password} onChange={this.handleChangePass} />
        	</label>
        	<input type="submit" value="Go!" />
          </form>
          <p></p>
          <button onClick={this.registerForm.bind(this)}>Register</button>  
          {this.state.showRegister ?  
          <Register
            closeWindow={this.registerForm.bind(this)}  
          />  
          : null  
          }
      	</div>
    );
  }
}
export default Login;