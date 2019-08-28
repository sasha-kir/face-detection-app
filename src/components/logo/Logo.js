import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import planet from './planet.png';

const Logo = () => {
	return (
		<div className="logo ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner"><img src={planet} alt="logo: a blue planet"/></div>
			</Tilt>
		</div>
	);
}

export default Logo;