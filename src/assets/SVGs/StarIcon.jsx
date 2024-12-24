import React from 'react';

const StarIcon = ({
	height,
	width,
	stopColor = '#4E42F4',
	stopColor2 = '#89A9DF',
	className,
	black,
	blackClassName,
}) => {
	if (black)
		return (
			<svg
				width={width || '24'}
				height={height || '24'}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={`${blackClassName}`}
			>
				<path
					d="M11 3L9.26582 7.50886C8.98381 8.24209 8.84281 8.60871 8.62353 8.91709C8.42919 9.1904 8.1904 9.42919 7.91709 9.62353C7.60871 9.8428 7.24209 9.98381 6.50886 10.2658L2 12L6.50886 13.7342C7.24209 14.0162 7.60871 14.1572 7.91708 14.3765C8.1904 14.5708 8.42919 14.8096 8.62353 15.0829C8.8428 15.3913 8.98381 15.7579 9.26582 16.4911L11 21L12.7342 16.4911C13.0162 15.7579 13.1572 15.3913 13.3765 15.0829C13.5708 14.8096 13.8096 14.5708 14.0829 14.3765C14.3913 14.1572 14.7579 14.0162 15.4911 13.7342L20 12L15.4911 10.2658C14.7579 9.98381 14.3913 9.84281 14.0829 9.62353C13.8096 9.42919 13.5708 9.1904 13.3765 8.91709C13.1572 8.60871 13.0162 8.24209 12.7342 7.50886L11 3Z"
					stroke="#1A1A1A"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M19.5 17L19.9358 17.8716C20.0833 18.1666 20.1571 18.3141 20.2556 18.4419C20.343 18.5553 20.4447 18.657 20.5581 18.7444C20.6859 18.8429 20.8334 18.9167 21.1284 19.0642L22 19.5L21.1284 19.9358C20.8334 20.0833 20.6859 20.1571 20.5581 20.2556C20.4447 20.343 20.343 20.4447 20.2556 20.5581C20.1571 20.6859 20.0833 20.8334 19.9358 21.1284L19.5 22L19.0642 21.1284C18.9167 20.8334 18.8429 20.6859 18.7444 20.5581C18.657 20.4447 18.5553 20.343 18.4419 20.2556C18.3141 20.1571 18.1666 20.0833 17.8716 19.9358L17 19.5L17.8716 19.0642C18.1666 18.9167 18.3141 18.8429 18.4419 18.7444C18.5553 18.657 18.657 18.5553 18.7444 18.4419C18.8429 18.3141 18.9167 18.1666 19.0642 17.8716L19.5 17Z"
					stroke="black"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M19.5 2L19.9358 2.87162C20.0833 3.16661 20.1571 3.3141 20.2556 3.44191C20.343 3.55533 20.4447 3.657 20.5581 3.74443C20.6859 3.84295 20.8334 3.9167 21.1284 4.06419L22 4.5L21.1284 4.93581C20.8334 5.0833 20.6859 5.15705 20.5581 5.25557C20.4447 5.343 20.343 5.44467 20.2556 5.55808C20.1571 5.6859 20.0833 5.83339 19.9358 6.12838L19.5 7L19.0642 6.12838C18.9167 5.83339 18.8429 5.6859 18.7444 5.55808C18.657 5.44467 18.5553 5.343 18.4419 5.25557C18.3141 5.15705 18.1666 5.0833 17.8716 4.93581L17 4.5L17.8716 4.06419C18.1666 3.9167 18.3141 3.84295 18.4419 3.74443C18.5553 3.657 18.657 3.55533 18.7444 3.44191C18.8429 3.3141 18.9167 3.16661 19.0642 2.87162L19.5 2Z"
					stroke="black"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);

	return (
		<svg
			width={width || '42'}
			height={height || '42'}
			className={className}
			viewBox="0 0 42 42"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M20.7434 9.13271C20.2796 7.92706 20.0478 7.32423 19.7131 7.14935C19.423 6.99779 19.077 6.99779 18.7869 7.14935C18.4522 7.32423 18.2204 7.92706 17.7566 9.13272L16.2152 13.1405C15.7217 14.4237 15.4749 15.0652 15.0912 15.6049C14.7511 16.0832 14.3332 16.5011 13.8549 16.8412C13.3152 17.2249 12.6737 17.4717 11.3905 17.9652L7.38272 19.5066C6.17706 19.9704 5.57423 20.2022 5.39935 20.5369C5.24779 20.827 5.24779 21.173 5.39935 21.4631C5.57423 21.7978 6.17706 22.0296 7.38272 22.4934L11.3905 24.0348C12.6737 24.5283 13.3152 24.7751 13.8549 25.1588C14.3332 25.4989 14.7511 25.9168 15.0912 26.3951C15.4749 26.9348 15.7217 27.5763 16.2152 28.8595L17.7566 32.8673C18.2204 34.0729 18.4522 34.6758 18.7869 34.8506C19.077 35.0022 19.423 35.0022 19.7131 34.8506C20.0478 34.6758 20.2796 34.0729 20.7434 32.8673L22.2848 28.8595C22.7783 27.5763 23.0251 26.9348 23.4088 26.3951C23.7489 25.9168 24.1668 25.4989 24.6451 25.1588C25.1848 24.7751 25.8263 24.5283 27.1095 24.0348L31.1173 22.4934C32.3229 22.0296 32.9258 21.7978 33.1006 21.4631C33.2522 21.173 33.2522 20.827 33.1006 20.5369C32.9258 20.2022 32.3229 19.9704 31.1173 19.5066L27.1095 17.9652C25.8263 17.4717 25.1848 17.2249 24.6451 16.8412C24.1668 16.5011 23.7489 16.0832 23.4088 15.6049C23.0251 15.0652 22.7783 14.4237 22.2848 13.1405L20.7434 9.13271Z"
				fill="url(#paint0_linear_3391_41253)"
			/>
			<path
				d="M33.3623 31.2753C33.6766 30.6469 34.5734 30.6469 34.8877 31.2753C35.1458 31.7916 35.2748 32.0497 35.4473 32.2734C35.6002 32.4718 35.7782 32.6498 35.9766 32.8027C36.2003 32.9752 36.4584 33.1042 36.9747 33.3623C37.6031 33.6766 37.6031 34.5734 36.9747 34.8877C36.4584 35.1458 36.2003 35.2748 35.9766 35.4473C35.7782 35.6002 35.6002 35.7782 35.4473 35.9766C35.2748 36.2003 35.1458 36.4584 34.8877 36.9747C34.5734 37.6031 33.6766 37.6031 33.3623 36.9747C33.1042 36.4584 32.9752 36.2003 32.8027 35.9766C32.6498 35.7782 32.4718 35.6002 32.2734 35.4473C32.0497 35.2748 31.7916 35.1458 31.2753 34.8877C30.6469 34.5734 30.6469 33.6766 31.2753 33.3623C31.7916 33.1042 32.0497 32.9752 32.2734 32.8027C32.4718 32.6498 32.6498 32.4718 32.8027 32.2734C32.9752 32.0497 33.1042 31.7916 33.3623 31.2753Z"
				fill="url(#paint1_linear_3391_41253)"
			/>
			<path
				d="M33.3623 5.02534C33.6766 4.39686 34.5734 4.39686 34.8877 5.02534C35.1458 5.54157 35.2748 5.79968 35.4473 6.02335C35.6002 6.22183 35.7782 6.39976 35.9766 6.55275C36.2003 6.72516 36.4584 6.85422 36.9747 7.11233C37.6031 7.42657 37.6031 8.32343 36.9747 8.63767C36.4584 8.89578 36.2003 9.02484 35.9766 9.19725C35.7782 9.35024 35.6002 9.52817 35.4473 9.72665C35.2748 9.95032 35.1458 10.2084 34.8877 10.7247C34.5734 11.3531 33.6766 11.3531 33.3623 10.7247C33.1042 10.2084 32.9752 9.95032 32.8027 9.72665C32.6498 9.52817 32.4718 9.35024 32.2734 9.19725C32.0497 9.02484 31.7916 8.89578 31.2753 8.63767C30.6469 8.32343 30.6469 7.42657 31.2753 7.11233C31.7916 6.85422 32.0497 6.72516 32.2734 6.55275C32.4718 6.39976 32.6498 6.22183 32.8027 6.02335C32.9752 5.79968 33.1042 5.54156 33.3623 5.02534Z"
				fill="url(#paint2_linear_3391_41253)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_3391_41253"
					x1="19.25"
					y1="5.25"
					x2="19.25"
					y2="36.75"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor={stopColor} />
					<stop offset="1" stopColor={stopColor2} />
				</linearGradient>
				<linearGradient
					id="paint1_linear_3391_41253"
					x1="34.125"
					y1="29.75"
					x2="34.125"
					y2="38.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor={stopColor} />
					<stop offset="1" stopColor={stopColor2} />
				</linearGradient>
				<linearGradient
					id="paint2_linear_3391_41253"
					x1="34.125"
					y1="3.5"
					x2="34.125"
					y2="12.25"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor={stopColor} />
					<stop offset="1" stopColor={stopColor2} />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default StarIcon;