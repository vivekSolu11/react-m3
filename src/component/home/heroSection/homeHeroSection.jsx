import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from 'component/customComponents/button/CustomButton';

import './heroSection.css';

const HomeHeroSection = () => {
	const navigate = useNavigate();
	return (
		<Box className="flex flex-col pt-11 md:pt-20  gap-10 md:gap-20 items-center">
			<Box className="flex flex-col gap-3 md:gap-4">
				<Box className="text-2xl md:text-[64px] md:leading-[75px] font-semibold text-center">
					Accelerate Your Job Search with AI{' '}
					<span className="whitespace-nowrap"> Co-Pilot</span>
				</Box>
				<div className="flex justify-center w-full">
					<Box className=" text-sm md:text-2xl md:leading-7 text-center text-[#121212] opacity-60 md:max-w-[998px]">
						Gain the ultimate edge in today&#39;s competitive landscape with AI at your
						fingertips.
					</Box>
				</div>
			</Box>
			<PrimaryButton
				handleClick={() => navigate('/sign-up')}
				buttonText="Try Joblo.ai for Free"
				varient="primary"
			/>
		</Box>
	);
};

export default HomeHeroSection;
