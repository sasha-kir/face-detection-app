import React, { Component } from "react";
import "./SignIn.css";
import { withAlert } from "react-alert";

class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}

	onUsernameChange = (event) => {
		this.setState({ username: event.target.value });
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
		const { username, password } = this.state;
		if (!username || !password) {
			this.props.alert.show("Please fill in all appropriate fields");
		} else {
			fetch(process.env.REACT_APP_SERVER_URL + "/sign-in", {
				method: "post",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					username: username,
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
			  	this.props.alert.error("Wrong username or password");
			  })
		}
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<div className="sign-in-main-div center-content">
				<div className="sign-in-wrapper">
					<form className="sign-in-form">
					  <div className="form-element f4 white">
					    <h1>Sign In</h1>
					  </div>

					  <div className="form-element block-cube block-input">
					    <input placeholder="username" type="text" 
					           onChange={this.onUsernameChange} required />
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
					    <div className="login-text button-text">Log In</div>
					  </button>

					  <div className="link dim pointer mt4 mb2 f5 white center-content" 
					       onClick={() => onRouteChange("register")}>
					  	Create an account
					  </div>
					</form>
				</div>
			</div>
		);
	}
}

export default withAlert()(SignIn);
