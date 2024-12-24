import React from 'react';

import ItemLayout from './itemLayout/ItemLayout';
import { AIDRIVEN } from 'assets/images';

const AiDriven = ({ isHome }) => {
	const handleClick = () => {};
	return (
		<ItemLayout
			isleft={true}
			title={
				isHome ? (
					<span className="">
						<span>Helps you in </span>
						<strong> decision making</strong>
					</span>
				) : (
					<>
						{/* For large screens (md and above) */}
						<span className="hidden md:inline">
							<span className="font-[600]">AI-driven decision </span>
							<span>making for your job</span>
						</span>

						{/* For small screens (below md) */}
						<span className="inline md:hidden text-xl font-normal text-[#1A1A1A] leading-6">
							<span>Helps you in </span>
							<strong> decision making</strong>
						</span>
					</>
				)
			}
			description="The AI-driven decision-making tool provides a match score for every job, breaking it down into experience, skill, and profile compatibility to help you choose the best opportunities."
			buttonText="Try Now"
			src={AIDRIVEN}
			clickHandler={handleClick}
			// height="h-[760px]"
		></ItemLayout>
	);
};

export default AiDriven;
