import React, { Component } from "react";
import "./Register.css";
import { withAlert } from "react-alert";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: ""
		}
	}

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
	}

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	}

	handleEnter = (event) => {
   		if (event.key === "Enter") {
   			this.handleSubmit();
   		}
   	}

	handleSubmit = () => {
		const { name, email, password } = this.state;
		const emailInput = document.getElementById("email-input");

		if (!name || !email || !password) {
			this.props.alert.show("Please fill in all appropriate fields");
		} else if (!emailInput.checkValidity()) {
			this.props.alert.show("Please provide a valid email");
		} else {
			fetch(process.env.REACT_APP_SERVER_URL + "/register", {
				method: "post",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: name,
					email: email,
					password: password
				})
			})
			  .then(response => {
			  	if (response.status === 200) {
			  		return Promise.resolve(response.json())
			  	} else {
			  		var error = new Error(response.statusText || response.status);
      				error.response = response;
      				return Promise.reject(error)
			  	}
			  })
			  .then(user => {
			      	this.props.loadUser(user);
			        this.props.onRouteChange("home");
			  })
			  .catch(err => {
			  	this.props.alert.error("User with this email already exists");
			  })
		}
	}

	render() {
		const emailPattern = "^[a-zA-Z0-9\\.\\-_]+@[a-z]+\\.[a-z]{2,3}$";
		const { onRouteChange } = this.props;
		return (
			<div className="sign-in-main-div center-content">
				<div className="sign-in-wrapper">
					<form className="register-form sign-in-form">
					  <div className="form-element f4 white">
					    <h1>Registration</h1>
					  </div>

					  <div className="form-element block-cube block-input">
					    <input placeholder="your name" type="text" 
					    	   onChange={this.onNameChange} required />
					    <div className="cube-top"><div className="cube-top-inner"></div></div>
					    <div className="cube-right"><div className="cube-right-inner"></div></div>
					    <div className="cube"><div className="cube-inner"></div></div>
					  </div>

					  <div className="form-element block-cube block-input">
					    <input id="email-input" placeholder="email" type="text"
					           pattern={emailPattern} onChange={this.onEmailChange} required />
					    <div className="cube-top"><div className="cube-top-inner"></div></div>
					    <div className="cube-right"><div className="cube-right-inner"></div></div>
					    <div className="cube"><div className="cube-inner"></div></div>
					  </div>

					  <div className="form-element block-cube block-input">
					    <input placeholder="password" type="password" 
					           onChange={this.onPasswordChange} 
					           onKeyDown={this.handleEnter} required />
					    <div className="cube-top"><div className="cube-top-inner"></div></div>
					    <div className="cube-right"><div className="cube-right-inner"></div></div>
					    <div className="cube"><div className="cube-inner"></div></div>
					  </div>

					  <button className="block-button block-cube grow" 
					  	      type="button" onClick={this.handleSubmit} >
					    <div className="cube-top"><div className="cube-top-inner"></div></div>
					    <div className="cube-right"><div className="cube-right-inner"></div></div>
					    <div className="cube"><div className="cube-inner"></div></div>
					    <div className="login-text button-text">Sign Up</div>
					  </button>

					  <div className="link dim pointer mt4 mb1 f5 white center-content" 
					       onClick={() => onRouteChange("sign-in")}>
					  	Go back
					  </div>
					</form>
				</div>
			</div>
		);
	}
}

export default withAlert()(Register);
