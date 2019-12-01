import React from 'react';

const Navigation = ({ onRouteChange }) => {
	return (
		<nav style={{display: "flex", justifyContent: "flex-end", marginBottom: "-70px"}}>
			<p className="f3 link dim white underline pa3 pointer">
				Home
			</p>
			<p id="sign-out" className="f3 link dim white underline pa3 pointer" onClick={() => onRouteChange("sign-in")}>
				Sign Out
			</p>
		</nav>
	);
}

export default Navigation;