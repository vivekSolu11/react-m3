import React from 'react';

const CloseIcon = ({ Svgclass }) => {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M21 11L11 21M11 11L21 21"
				className={`${Svgclass}`}
				stroke="#666666"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default CloseIcon;
