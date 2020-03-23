import React, {Component} from 'react';
import './register.css';
class Register extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	username: '',
    	password: '',
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    {this.props.closeWindow()}
  }

  render() {
    return (
    	<div className='register'>
      	<form onSubmit={this.handleSubmit}>
      	<p>Register</p>
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
export default Register;