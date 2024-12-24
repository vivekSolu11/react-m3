import * as React from 'react';
const RightButtonIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
		fill="none"
		className={`${props.className}`}
		{...props}
	>
		<path
			fill="#fff"
			d="M47.25 24C47.25 11.16 36.84.75 24 .75S.75 11.16.75 24 11.16 47.25 24 47.25 47.25 36.84 47.25 24Z"
		/>
		<path
			stroke="#E6E6E6"
			strokeWidth={1.5}
			d="M47.25 24C47.25 11.16 36.84.75 24 .75S.75 11.16.75 24 11.16 47.25 24 47.25 47.25 36.84 47.25 24Z"
		/>
		<path
			stroke="#B3B3B3"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={3}
			d="m27.75 16.5-7.5 7.5 7.5 7.5"
		/>
	</svg>
);
export default RightButtonIcon;
