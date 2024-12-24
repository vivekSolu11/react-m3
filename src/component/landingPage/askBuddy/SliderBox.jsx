import React, { useEffect, useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import Slider from '../../swiper';
import { RightArrow } from 'assets';
import { AskBuddydata } from 'constants/AskBuddy';
import { landiingTabs } from 'constants/initialValues';
import { useDispatch } from 'react-redux';
import { addState, removeState } from 'store/sagaActions';
import { useLocation, useNavigate } from 'react-router-dom';

const SliderBox = ({ value }) => {
	const prevRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	// eslint-disable-next-line no-unused-vars
	const [_, setInit] = useState();
	const [slide, setSlide] = useState(true);

	const nextRef = useRef(null);
	const dispatch = useDispatch();
	const handleQues = (ques) => {
		dispatch(addState({ name: 'sliderQues', value: ques }));
		navigate('/chat-with-bot');
	};

	useEffect(() => {
		const emptyQues = () => {
			dispatch(removeState({ name: 'sliderQues' }));
		};
		emptyQues();
	}, [location.pathname, dispatch]);

	useEffect(() => {
		setSlide(true);
	}, [value]);

	return (
		<>
			<Slider
				height={'114px'}
				mousewheel
				keyboard
				pagination={false}
				onReachBeginning={() => setSlide(true)}
				onReachEnd={() => setSlide(false)}
				onInit={() => setInit(true)}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				breakpoints={{
					0: {
						slidesPerView: 1.5,
						spaceBetween: 20,
					},
					400: {
						slidesPerView: 1.2,
						spaceBetween: 20,
					},
					640: {
						slidesPerView: 1.5,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 30,
					},
					1024: {
						slidesPerView: 2.6,
						spaceBetween: 30,
					},
					1200: {
						slidesPerView: 3.3,
						spaceBetween: 30,
					},
				}}
			>
				{AskBuddydata[landiingTabs[value].key].map((item, i) => (
					<SwiperSlide key={i} className={`quebox ${i === 1 ? 'blurred-card' : ''}`}>
						<div className="flex w-[340px] swiper_box text-left h-full gap-4 sm:pt-4 md:p-6 p-3 text-sm md:text-base tracking-tight leading-6 bg-[#F5FFF5]  rounded-xl border border-greenBorder border-solid shadow-[0px_0px_8px_rgba(21,91,10,0.12)] text-zinc-900">
							<div className="flex-1 shrink basis-0 h-full swiper_box_text text-[#1a1a1a]">
								{item.question}
							</div>
							<svg
								className="cursor-pointer z-10"
								onClick={() => handleQues(item.question)}
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7 17L17 7M17 7H7M17 7V17"
									stroke="#1a1a1a"
									strokeWidth="1"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</SwiperSlide>
				))}
			</Slider>
			<button
				className={`hidden ${slide ? 'hidden' : 'md:flex'} absolute z-50 bg-transparent rounded-full h-8 w-8 border rotate-180 border-black  items-center justify-center -left-5 bg-white top-[41%]`}
				ref={prevRef}
			>
				<RightArrow left={true} />
			</button>
			<button
				ref={nextRef}
				className={`absolute z-50 bg-transparent rounded-full h-8 w-8 border rotate-180 border-black hidden  ${!slide ? 'hidden' : 'md:flex'}  items-center justify-center -right-5 bg-white top-[41%]`}
			>
				<RightArrow />
			</button>
		</>
	);
};

export default SliderBox;
