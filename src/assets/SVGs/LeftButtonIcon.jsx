import * as React from 'react';
const LeftButtonIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
		className={`${props.className}`}
		fill="none"
		{...props}
	>
		<rect
			width={46.5}
			height={46.5}
			x={-0.75}
			y={0.75}
			fill="#fff"
			rx={23.25}
			transform="matrix(-1 0 0 1 46.5 0)"
		/>
		<rect
			width={46.5}
			height={46.5}
			x={-0.75}
			y={0.75}
			stroke="#E6E6E6"
			strokeWidth={1.5}
			rx={23.25}
			transform="matrix(-1 0 0 1 46.5 0)"
		/>
		<path
			stroke="#B3B3B3"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={3}
			d="m20.25 31.5 7.5-7.5-7.5-7.5"
		/>
	</svg>
);
export default LeftButtonIcon;
