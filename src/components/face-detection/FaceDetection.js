import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ boundingBoxes, imageToDisplay }) => {
	let renderedBoxes = [];

	if (boundingBoxes.length > 0) {
		renderedBoxes = boundingBoxes.map((box, index) =>
			<div key={index}
				 className="bounding-box" 
				 style={{top: box.topRow, bottom: box.bottomRow, 
						 right: box.rightCol, left: box.leftCol}}>
			</div>
		);
	};

	if (imageToDisplay) {
		return (
			<div className="center-content">
				<div className="relative mt3 mb1">
					<img id="input-image" src={imageToDisplay} height="400px" width="auto" alt="" />
					{renderedBoxes}
				</div>
			</div>
		);
	} else {
		return null;
	}
}

export default FaceDetection;