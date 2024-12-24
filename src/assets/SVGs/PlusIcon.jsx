import React from 'react';

const PlusIcon = ({ color }) => {
	return (
		<svg
			width="12"
			height="11"
			viewBox="0 0 12 11"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.99967 0.5V9.83333M1.33301 5.16667H10.6663"
				stroke={color || '#14A019'}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default PlusIcon;
