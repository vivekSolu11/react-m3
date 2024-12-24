import React from 'react';
import { useMediaQuery } from '@mui/material';

import ItemLayout from './itemLayout/ItemLayout';
import { CarrerAdvisorImg, CarrerAdvisorImgMob } from 'assets/images';

const CarrerAdvisor = ({ isHome }) => {
	const isMobile = useMediaQuery('(max-width: 768px)');

	const handleClick = () => {};
	return (
		<ItemLayout
			isleft={false}
			title={
				isHome ? (
					<span className="inline  font-normal">
						<b>Get unlimited career advice </b>
						<span>with A.I.</span>
					</span>
				) : (
					<>
						<span className="hidden md:inline">
							<span className="font-[600]">AI career advisor</span>
							<span> for your dream job</span>
						</span>

						{/* For small screens (below md) */}
						<span className="inline md:hidden text-xl font-normal text-[#1A1A1A]">
							<b>Get unlimited career advice </b>
							<span>with A.I.</span>
						</span>
					</>
				)
			}
			description="Chart your path to career success with a personalized AI assistant. Receive actionable advice on the skills you need, potential job transitions, and salary expectations to help you achieve your professional goals."
			buttonText="Try Now"
			// src={CarrerAdvisorImg}
			src={isMobile ? CarrerAdvisorImgMob : CarrerAdvisorImg}
			clickHandler={handleClick}
			// height="h-[760px]"
		></ItemLayout>
	);
};

export default CarrerAdvisor;
