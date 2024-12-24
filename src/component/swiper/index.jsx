import React from 'react';
import { Swiper } from 'swiper/react';

import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './index.css';
const Slider = ({
	children,
	height,
	navigation = false,
	keyboard = false,
	pagination = false,
	slidesPerView = 3,
	loop,
	autoplay,
	breakpoints,
	className = '',
	onSlideChange = () => {},
	...rest
}) => {
	return (
		<>
			<Swiper
				navigation={navigation}
				keyboard={keyboard}
				onSlideChange={onSlideChange}
				pagination={pagination}
				modules={[Navigation, Pagination, Keyboard, Autoplay]}
				className={`mySwiper ${className}`}
				breakpoints={breakpoints}
				slidesPerView={slidesPerView}
				style={{
					height: height,
				}}
				spaceBetween={30}
				loop={loop}
				autoplay={autoplay}
				{...rest}
			>
				{children}
			</Swiper>
		</>
	);
};

export default Slider;
