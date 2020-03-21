import React, {Component} from 'react';
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
    var payload = {
    	"username": this.state.username,
    	"password": this.state.password
    }
    console.log(payload)
  }

  registerForm(event) {
  	this.setState({showRegister: true});
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
      	</div>
    );
  }
}
export default Login;