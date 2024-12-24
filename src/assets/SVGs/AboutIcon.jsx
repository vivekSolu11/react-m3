import * as React from 'react';
const SvgComponent = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={21} fill="none" {...props}>
		<ellipse cx={12} cy={17.566} fill="#E7FBE5" rx={12} ry={3} />
		<path
			fill="#ABF0A1"
			d="M12 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z"
		/>
		<path fill="#ABF0A1" d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
		<path fill="#ABF0A1" d="M12 11.667a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z" />
		<path
			stroke="#100C08"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={0.6}
			d="M12 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z"
		/>
		<path
			stroke="#100C08"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={0.6}
			d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
		/>
		<path
			stroke="#100C08"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={0.6}
			d="M12 11.667a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z"
		/>
	</svg>
);
export default SvgComponent;
