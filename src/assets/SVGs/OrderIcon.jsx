import * as React from 'react';
const SvgComponent = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
		<path
			stroke="#1A1A1A"
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M2 6.167h12M2 10.833h12"
		/>
	</svg>
);
export default SvgComponent;
