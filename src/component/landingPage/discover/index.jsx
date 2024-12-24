import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { useQueryAPI } from 'apis/query';
import { useQuery } from '@tanstack/react-query';

import Slider from '../../swiper';

import './index.css';

function StatCard({ value = '', description = '' }) {
	return (
		<div className="flex w-32 md:w-auto flex-col justify-center items-center px-2 py-4 md:px-6 md:py-8  rounded-xl box">
			<div className="text-base md:text-4xl font-semibold text-center">{value}</div>
			<div className="mt-1 text-sm md:text-base tracking-tight leading-snug text-stone-500 text-[#666666]">
				{description}
			</div>
		</div>
	);
}
const Discover = ({ totalJobs = 1000, todayJobs = 1000 }) => {
	const stats = [
		{ value: totalJobs, description: 'Total jobs' },
		{ value: todayJobs, description: 'New jobs today' },
	];
	const { fetchLandingCompanies } = useQueryAPI();
	const { data } = useQuery({
		queryKey: ['fetchLandingCompany'],
		queryFn: fetchLandingCompanies,
		staleTime: 300000,
	});

	return (
		<div className="bg-primary-light discover_Container md:p-9 rounded-2xl flex flex-col gap-10 p-4 pt-6 text-[#1A1A1A] mb-14">
			<div className="flex flex-col md:flex-row gap-6 justify-between items-center w-full max-md:max-w-full">
				<h1 className="self-stretch my-auto text-sm md:text-2xl text-center md:text-start font-semibold tracking-tight  text-zinc-900">
					Discover job opportunities and <br /> build the career you want
				</h1>
				<div className="flex flex-row gap-6 items-center justify-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
					{stats?.length > 0 &&
						stats.map((stat, index) => (
							<React.Fragment key={index}>
								<StatCard value={stat?.value} description={stat?.description} />
								{index === 0 && (
									<div className="shrink-0 self-stretch hidden md:flex w-[1px] border-2  bg-[#CCCCCC] border-[#CCCCCC] h-[137px]"></div>
								)}
							</React.Fragment>
						))}
				</div>
			</div>
			<div className="flex flex-col self-center w-full text-sm md:text-2xl font-medium tracking-tight leading-snug text-center text-zinc-900 max-md:max-w-full">
				<p className="max-md:max-w-full m-0 mb-1 leading-custom-21">
					Opportunities from different organizations
				</p>
				<Slider
					height={'100'}
					loop={true}
					slidesPerView={7}
					autoplay={{
						delay: 20000,
						disableOnInteraction: false,
					}}
					mousewheel
					keyboard
					breakpoints={{
						0: {
							slidesPerView: 3.5,
							spaceBetween: 20,
						},
						400: {
							slidesPerView: 3.5,
							spaceBetween: 20,
						},
						640: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 30,
						},
						1200: {
							slidesPerView: 7,
							spaceBetween: 30,
						},
					}}
					sliderRef={undefined}
				>
					{data?.items?.map((item) => (
						<SwiperSlide key={item?._id} className="w-16">
							<div className="bg-primary-light">
								<img
									src={item?.logo}
									alt={item?.name}
									height={63.33}
									width={64}
									loading="lazy"
									className="w-16 object-contain mix-blend-multiply h-16"
								/>
							</div>
						</SwiperSlide>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default Discover;
