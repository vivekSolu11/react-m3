import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';

import Slider from 'component/swiper';
import { AI_CHATBOT, RESUME_ANA, RESUME_DOWNLOAD } from 'assets/images';
import { LEFTBUTTONICON, RIGHTBUTTONICON } from 'assets/index';
import { useQueryAPI } from 'apis/query';
import PlansCard from './PlansCard';
import PaymentSuccessModal from 'component/modal/paymentSuccess/PaymentSuccessModal';
import { Spinner } from 'component/index';

const plans = {
	resumeAnalyzerAndCustomizer: {
		title: 'Resume Analyzer & Customiser',
		description: 'AI-driven resume scoring and customization for targeted job',
		price: '₹49',
		buttonText: 'Select Plan',
		isBestSelling: false,
		image: RESUME_ANA,
		Content: ['5 Resume customisations', '5 Resume analyses'],
	},
	buddyBotMessages: {
		title: 'AI Buddy bot',
		description: 'Create an ATS friendly Resume',
		price: '₹49',
		buttonText: 'Select Plan',
		isBestSelling: true,
		image: AI_CHATBOT,
		Content: ['30 Buddy bot messages'],
	},
	resumeDownloads: {
		title: 'Resume Builder',
		description: 'Create an ATS friendly Resume',
		price: '₹49',
		buttonText: 'Select Plan',
		isBestSelling: true,
		image: RESUME_DOWNLOAD,
		Content: ['3 Resume builder downloads'],
	},
	// resumeCustomizations :{
	//   title: 'Interview Questions',
	//   description:
	//     'Prepare with more target and personalized interview questions',
	//   price: '₹49',
	//   buttonText: 'Select Plan',
	//   isBestSelling: false,
	//   image: SAME_IMG,
	// },
	// resumeCustomizations :{
	//   title: 'Salary Predictor',
	//   description:
	//     'Insights into salary trends and predictions for desired job roles',
	//   price: '₹49',
	//   buttonText: 'Select Plan',
	//   isBestSelling: false,
	//   image: SAME_IMG,
	// },
	// resumeCustomizations :{
	//   title: 'Career Advisor',
	//   description: 'Access to expert advice tailored to user’s profile',
	//   price: '₹49',
	//   buttonText: 'Select Plan',
	//   isBestSelling: false,
	//   image: SAME_IMG,
	// },
};

const PricingSlider = () => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [_, setInit] = useState();

	const [loading, setLoading] = useState(false);
	const { fetchTopUpPlans } = useQueryAPI();

	const { data } = useQuery({
		queryKey: ['getTopupPlans'],
		queryFn: () => fetchTopUpPlans(),
		staleTime: 300000,
	});

	return (
		<div className="flex flex-col gap-4 py-4 relative">
			{loading && <Spinner />}
			<div className="flex flex-col gap-1">
				<h2 className="text-xl font-medium tracking-tight text-[#1A1A1A] m-0">
					Looking for top up plans?
				</h2>
				<div className="">
					<div>
						<p className="text-xs font-normal tracking-tight text-[#666666] m-0">
							Choose a plan that’s right for you
						</p>
					</div>
					<div ref={prevRef} className="m-0">
						<RIGHTBUTTONICON className="absolute w-8 h-8 md:w- md:h- cursor-pointer z-50 right-[40px] top-[40px] transform -translate-y-1/2  lg:transform lg:-translate-y-1/2" />
					</div>
					<div ref={nextRef} className="m-0">
						<LEFTBUTTONICON className="absolute w-8 h-8 md:w- md:h- cursor-pointer z-50 right-0 top-[40px] transform -translate-y-1/2 lg:transform lg:-translate-y-1/2 " />
					</div>
				</div>
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
						slidesPerView: 1,
						spaceBetween: 20,
					},
					400: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					604: {
						slidesPerView: 1,
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
						slidesPerView: 4.5,
						spaceBetween: 30,
					},
					1200: {
						slidesPerView: 4.5,
						spaceBetween: 30,
					},
				}}
			>
				{/* <div className="flex gap-6 "> */}
				{data?.items?.length &&
					data?.items?.map((item, index) => (
						<SwiperSlide key={index} className="!w-[222px]">
							<PlansCard
								key={index}
								title={plans[item?.name]?.title}
								description={plans[item?.name]?.description}
								price={item?.price}
								buttonText={plans[item?.name]?.buttonText}
								isBestSelling={item?.isBestSelling}
								image={plans[item?.name]?.image}
								Content={plans[item?.name]?.Content}
								TopUpId={item?._id}
								setLoading={setLoading}
							/>
						</SwiperSlide>
					))}
				{/* </div> */}
			</Slider>
			<PaymentSuccessModal />
		</div>
	);
};

export default PricingSlider;
