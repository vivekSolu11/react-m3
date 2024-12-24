import React, { useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import Slider from 'component/swiper';
import { LEFTBUTTONICON, RIGHTBUTTONICON } from 'assets/index';

import {
	PROADVIMG,
	PROJOBIMG,
	PRORESIMG,
	PROBUILIMG,
	PROCONNIMG,
	PRODISIMG,
	PROSALIMG,
} from 'assets/images';

import ProductCard from './ProductCard';

import './aboutpage.css';
import 'swiper/css';

const features = [
	{
		imageSrc: PROJOBIMG,
		title: 'AI Powered Jobs',
		description:
			'Access jobs that matches your profile and is relevant for you every time you visit back.',
	},
	{
		imageSrc: PROADVIMG,
		title: 'AI Career Advisor',
		description:
			'Discover how you can seamlessly build or transition into any career with the help of AI.',
	},
	{
		imageSrc: PRORESIMG,
		title: 'AI Resume Analysis',
		description:
			'Save time with this feature as AI will scan, identify, & fix flaws in your resume.',
	},
	{
		imageSrc: PROCONNIMG,
		title: 'Connections',
		description: 'Build and grow your professional network. Connect with industry experts.',
	},
	{
		imageSrc: PROSALIMG,
		title: 'Salary Predictor',
		description:
			'Discover your market value based on your experience. Compare salaries by industry, location, and job title.',
	},
	{
		imageSrc: PROBUILIMG,
		title: 'Resume Builder',
		description:
			'Create professional resumes tailored to different industries. Customize templates to fit your style.',
	},
	{
		imageSrc: PRODISIMG,
		title: 'Discover',
		description:
			'Stay informed about top companies and industry trends. Research potential employers before applying.',
	},
];

const Product = () => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [_, setInit] = useState();

	return (
		<div className="py-8 relative">
			<div className="mb-[30px]">
				<h2 className="lg:text-[32px] text-[20px] font-semibold -tracking-[0.02rem]">
					Our Products
				</h2>
			</div>

			<Slider
				mousewheel
				keyboard
				pagination={false}
				onInit={() => setInit(true)}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				breakpoints={{
					0: {
						slidesPerView: 1.2,
						spaceBetween: 20,
					},
					400: {
						slidesPerView: 1.2,
						spaceBetween: 20,
					},
					604: {
						slidesPerView: 1.2,
						spaceBetween: 20,
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 30,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					1200: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
				}}
			>
				{features.map((feature, index) => (
					<SwiperSlide key={index}>
						<div className="h-full">
							<ProductCard
								image={feature.imageSrc}
								title={feature.title}
								description={feature.description}
							/>
						</div>
					</SwiperSlide>
				))}
			</Slider>

			<div ref={prevRef}>
				<RIGHTBUTTONICON className="absolute w-8 h-8 md:w-12 md:h-12 cursor-pointer z-50 right-[60px] top-[50px] md:top-[60px] transform -translate-y-1/2  lg:transform lg:-translate-y-1/2 " />
			</div>
			<div ref={nextRef}>
				<LEFTBUTTONICON className="absolute w-8 h-8 md:w-12 md:h-12 cursor-pointer z-50 right-0 top-[50px] md:top-[60px] transform -translate-y-1/2 lg:transform lg:-translate-y-1/2 " />
			</div>
		</div>
	);
};

export default Product;
