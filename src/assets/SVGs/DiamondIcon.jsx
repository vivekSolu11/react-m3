import React from 'react';

const DiamondIcon = () => {
	return (
		<svg
			width="94"
			height="93"
			viewBox="0 0 94 93"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="11" width="72" height="72" rx="12" fill="url(#paint0_linear_3596_92430)" />
			<g style={{ mixBlendMode: 'plusLighter' }} filter="url(#filter0_d_3596_92430)">
				<path
					d="M60.8169 21.083H33.1824L25.7693 31.2322L47.0001 55.2292L68.2308 31.2322L60.8169 21.083Z"
					stroke="url(#paint1_linear_3596_92430)"
					strokeWidth="3"
					strokeMiterlimit="10"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M25.7693 31.2322H68.2308M52.766 21.083H41.2341L38.1406 31.2322L47.0001 55.2292L55.8595 31.2322L52.766 21.083Z"
					stroke="url(#paint2_linear_3596_92430)"
					strokeWidth="3"
					strokeMiterlimit="10"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_3596_92430"
					x="0.269287"
					y="7.58301"
					width="93.4614"
					height="85.1465"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="12" />
					<feGaussianBlur stdDeviation="12" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_3596_92430"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_3596_92430"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_3596_92430"
					x1="47.5"
					y1="72"
					x2="47.5"
					y2="0"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#C6FF8D" />
					<stop offset="0.553" stopColor="#89D4FE" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_3596_92430"
					x1="47.0001"
					y1="21.083"
					x2="47.0001"
					y2="55.2292"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#F5F5F5" />
					<stop offset="1" stopColor="#141414" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_3596_92430"
					x1="47.0001"
					y1="21.083"
					x2="47.0001"
					y2="55.2292"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#F5F5F5" />
					<stop offset="1" stopColor="#141414" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default DiamondIcon;
