import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div className="center-content" style={{justifySelf: "start"}}>
			<div id="name" className="center-content white f3">
				{`${name}, your current entry count is`} &nbsp;
			</div>
			<div id="entries" className="white f1">
				{entries}
			</div>
		</div>
	);
}

export default Rank;