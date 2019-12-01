import React, { Component } from "react";
import "./ImageLinkForm.css";
import { withAlert } from "react-alert";


class ImageLinkForm extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			isUrlValid: false
		};
		this.handleEnter = this.handleEnter.bind(this);
		this.onClickAction = this.onClickAction.bind(this);
		// eslint-disable-next-line
		this.linkPattern = "^http(?:s)?:\\/\\/[\\w.%\\-+/]+(?:jp(?:e)?g|png|gif)$";
	}

	onClickAction(event) {
	  const urlInput = this.refs.urlInput;
	  if (urlInput.value && urlInput.checkValidity()) {
		  this.setState({ isUrlValid: true });
		  this.props.onImageSubmit();
	  } else {
		  this.setState({ isUrlValid: false });
		  this.props.alert.error("Please enter a valid image url");
	  }
   	}

   	handleEnter(event) {
   		if (event.key === "Enter") {
   			this.onClickAction(event);
   		}
	}
	   
	render() {
		const { onInputChange } = this.props;

		return(
			<div className="url-form-main-div br3">
				<div className="instructions center-content">
					<p>Insert a link to image below to apply <strong>Facial Recognition</strong></p>
				</div>
				<div className="center-content">
					<div className="center-content url-form pa3">
						<div className="form-element block-cube block-input">
							 <input ref="urlInput" autoComplete="off"
									className="user-input f5 pa2 w-70 center" 
								    type="url" pattern={this.linkPattern}
								    onKeyDown={this.handleEnter}
								    onChange={onInputChange} />
							<div className="cube-top"><div className="cube-top-inner"></div></div>
							<div className="cube-right"><div className="cube-right-inner"></div></div>
							<div className="cube"><div className="cube-inner"></div></div>
						</div>
						 <button className="block-button fwd-button block-cube grow" 
						 	 	 onClick={this.onClickAction} id="fwd-btn">
							 <div className="cube-top"><div className="cube-top-inner "></div></div>
							<div className="cube-right"><div className="cube-right-inner"></div></div>
							<div className="cube"><div className="cube-inner"></div></div>
							<div className="button-text fwd-text">R</div>
						 </button>
					 </div>
				</div>
			</div>
		);
	}
}

export default withAlert()(ImageLinkForm);