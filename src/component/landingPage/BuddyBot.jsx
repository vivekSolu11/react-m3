import React from 'react';

import ItemLayout from './itemLayout/ItemLayout';
import { BuddyBotImg } from 'assets/images';

const BuddyBot = ({ isHome }) => {
	return (
		<ItemLayout
			isleft={false}
			title={
				isHome ? (
					<span className="inline  text-[#1A1A1A]">
						<strong>Get interview tips</strong> <span>with Buddy copilot</span>
					</span>
				) : (
					<>
						<span className="hidden md:inline">
							<span>Your 24x7 personal</span>
							<span className="font-[600]"> AI Buddy Bot</span>
						</span>

						{/* For small screens (below md) */}
						<span className="inline md:hidden text-xl font-normal text-[#1A1A1A]">
							<strong>Get interview tips</strong> <span>with Buddy copilot</span>
						</span>
					</>
				)
			}
			description="Your personal AI career assistant is available around the clock to support you throughout your job search journey. Get instant advice and personalized guidance for your next interview or finding the right job opportunities whenever you need it."
			buttonText="Try Now"
			src={BuddyBotImg}
			// height="h-[760px] "
			isBgGradient={false}
		/>
	);
};

export default BuddyBot;
