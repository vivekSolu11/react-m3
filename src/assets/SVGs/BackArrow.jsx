import React from 'react';

const BackArrow = ({ className }) => {
	return (
		<svg
			width="24"
			className={className}
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15 18L9 12L15 6"
				stroke="black"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default BackArrow;
