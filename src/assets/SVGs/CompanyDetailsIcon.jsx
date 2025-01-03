import * as React from 'react';
const SvgComponent = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={21} fill="none" {...props}>
		<ellipse cx={12} cy={17.566} fill="#E7FBE5" rx={12} ry={3} />
		<path
			fill="#ABF0A1"
			d="M5.833 9.167H8.25v-4c0-.934 0-1.4.182-1.757.16-.314.414-.569.728-.728.357-.182.823-.182 1.757-.182h2.166c.934 0 1.4 0 1.757.182.314.16.569.414.728.728.182.357.182.823.182 1.757v4h2.417c.466 0 .7 0 .878.09.157.08.284.208.364.365.091.178.091.411.091.878v7h-15v-7c0-.467 0-.7.09-.878a.833.833 0 0 1 .365-.365c.178-.09.412-.09.878-.09Z"
		/>
		<path
			stroke="#100C08"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={0.6}
			d="M8.25 9.167H5.833c-.466 0-.7 0-.878.09a.833.833 0 0 0-.364.365c-.091.178-.091.411-.091.878v7m11.25-8.333h2.417c.466 0 .7 0 .878.09.157.08.284.208.364.365.091.178.091.411.091.878v7m-3.75 0V5.167c0-.934 0-1.4-.182-1.757a1.666 1.666 0 0 0-.728-.728c-.357-.182-.823-.182-1.757-.182h-2.166c-.934 0-1.4 0-1.757.182-.314.16-.569.414-.728.728-.182.357-.182.823-.182 1.757V17.5m12.083 0H3.667m7.5-11.667h1.666m-1.666 3.334h1.666M11.167 12.5h1.666"
		/>
	</svg>
);
export default SvgComponent;
