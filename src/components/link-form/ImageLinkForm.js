import React from "react";
import "./ImageLinkForm.css";
import { useAlert } from "react-alert";


const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
	const alert = useAlert();
	// eslint-disable-next-line
	const linkPattern = "^http(?:s)?:\\/\\/[\\w.%\\-+/]+(?:jp(?:e)?g|png|gif)$";

	const onClickAction = (event) => {
	  const urlInput = document.getElementById("url-input");
      if (urlInput.checkValidity()) {
      	onImageSubmit();
      } else {
      	alert.error("Please enter a valid image url");
      }
   	}

   	const handleEnter = (event) => {
   		if (event.key === "Enter") {
   			onClickAction(event);
   		}
   	}

	return(
		<div className="url-form-main-div br3">
			<div className="instructions center-content">
				<p>Insert a link to image below to apply <strong>Facial Recognition</strong></p>
			</div>
			<div className="center-content">
				<div className="center-content url-form pa3">
					<div className="form-element block-cube block-input">
					 	<input id="url-input" autoComplete="off"
					 		   className="user-input f5 pa2 w-70 center" 
							   type="url" pattern={linkPattern}
							   onKeyDown={handleEnter}
							   onChange={onInputChange} />
						<div className="cube-top"><div className="cube-top-inner"></div></div>
	    				<div className="cube-right"><div className="cube-right-inner"></div></div>
	    				<div className="cube"><div className="cube-inner"></div></div>
	    			</div>
				 	<button className="block-button fwd-button block-cube grow" onClick={onClickAction}>
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

export default ImageLinkForm;