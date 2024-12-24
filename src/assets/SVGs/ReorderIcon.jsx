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
			// stroke="#0E8712"
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M14 7.167s-1.336-1.822-2.422-2.908a6 6 0 1 0 1.521 5.908m.902-3v-4m0 4h-4"
		/>
	</svg>
);
export default SvgComponent;
