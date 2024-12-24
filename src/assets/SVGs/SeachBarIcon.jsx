import * as React from 'react';
const SvgComponent = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={17}
		fill="none"
		className={`${className}`}
	>
		<path
			stroke={className}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m15.5 16-5-5m1.667-4.167a5.833 5.833 0 1 1-11.667 0 5.833 5.833 0 0 1 11.667 0Z"
		/>
	</svg>
);
export default SvgComponent;
