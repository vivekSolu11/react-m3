import React from 'react';

const PricingCheckIcon = ({ fillColor }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
		<defs>
			<linearGradient id={'gradientId'} x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#76FF7A" />
				<stop offset="100%" stopColor="#4285F4" />
			</linearGradient>
		</defs>
		<rect
			y="0.566864"
			width="11.8663"
			height="11.8663"
			rx="5.93313"
			fill={fillColor ? 'url(#gradientId)' : '#242424'}
		/>
		<path
			d="M8.47616 4.80481L4.97985 8.43733L3.39062 6.78619"
			stroke="white"
			strokeWidth="1.08976"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default PricingCheckIcon;
