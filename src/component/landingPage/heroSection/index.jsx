import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ArrowIcon, StarIcon } from 'assets';
import { addState } from 'store/sagaActions';

import './heroSection.css';

const data = [
	'Jobs',
	'Interview Questions',
	'Work-Life Balance Strategies',
	' Professional Development Opportunities',
	' Remote Work Best Practices',
];
const HeroSection = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();

	const [placeholder, setPlaceholder] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [updateCount, setUpdateCount] = useState(0);

	const dynamicPlaceHolder = (placeHolders) => {
		const intervalId = setInterval(() => {
			setUpdateCount((prevCount) => {
				const newPlaceholder = placeHolders[prevCount];
				setPlaceholder(newPlaceholder);
				return (prevCount + 1) % placeHolders.length;
			});
		}, 2200);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	};
	useEffect(() => {
		const cleanUp = dynamicPlaceHolder(data);
		return cleanUp;
	}, []);
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};
	const handleSubmit = () => {
		if (inputValue) {
			dispatch(addState({ name: 'sliderQues', value: inputValue }));
			navigate('/chat-with-bot');
		}
	};

	return (
		<Box className="flex flex-col py-11 md:py-20 gap-10 md:gap-20 items-center pb-[56px]">
			<Box className="flex flex-col gap-3 md:gap-4">
				<div className="headerText text-[#1a1a1a]">
					Accelerate Your Job Search with AI
					<span className="whitespace-nowrap"> Co-Pilot</span>
				</div>

				<div className="flex justify-center w-full">
					{/* Text for large screens */}
					<Box className="hidden md:block subText  text-center text-[#121212] opacity-60 md:max-w-[998px]">
						&quot;Join the future of job searching with our intelligent platform that
						offers personalized job recommendations, insights, and interview
						preparation.&quot;
					</Box>

					{/* Text for mobile screens */}
					<Box className="block md:hidden text-[14px] font-normal leading-[21px] tracking-[-0.02em] text-center text-[#666666] px-4 py-2">
						Gain the ultimate edge in today&#39;s competitive landscape with AI at your
						fingertips.
					</Box>
				</div>
			</Box>

			<div className="flex md:gap-10 justify-between items-center px-2 py-2 md:px-5 md:py-4 rounded-xl md:rounded-3xl border border-solid backdrop-blur-[16.5px] bg-white w-full  border-lightgray  lg:w-[998px]">
				<div className="flex gap-2 md:gap-3 items-center self-stretch my-auto  md:px-0 text-xl tracking-tight leading-snug text-neutral-900 w-full">
					<StarIcon className="w-5 h-5 md:w-[42px] md:h-[42px]" />
					<div className="flex  items-center self-stretch my-auto w-full relative">
						<label
							htmlFor="inputField"
							className={`anim-label ${inputValue ? 'activelabel' : ''} opacity-60 text-sm md:text-xl md:w-[calc(100%-18px)] w-[95%]`}
						>
							Search About <span>{placeholder}</span>
						</label>
						<input
							className=" h-6 md:h-10 text-sm md:text-[22px] w-full   focus:outline-none border-none bg-transparent"
							// placeholder={`Search About ${placeholder}`}
							// aria-label="Search for jobs"
							onChange={handleInputChange}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSubmit();
								}
							}}
						/>
					</div>
				</div>
				<button
					// type=""
					onClick={handleSubmit}
					className="border-none bg-[#ffffff00] cursor-pointer p-0 w-8 h-8 md:w-14 md:h-14"
				>
					<ArrowIcon className=" w-8 h-8 md:w-14 md:h-14" />
				</button>
			</div>
		</Box>
	);
};

export default HeroSection;
