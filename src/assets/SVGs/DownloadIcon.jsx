import * as React from 'react';
const SvgComponent = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
		<path
			stroke="#1A1A1A"
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M14 14.5H2m10-6.667-4 4m0 0-4-4m4 4V2.5"
		/>
	</svg>
);
export default SvgComponent;
