import { ACCURATE_ICON, HIGH_ICON, TOOLOW_ICON } from 'assets/images';
import { PrimaryButton } from 'component/customComponents/button/CustomButton';
import React from 'react';

import '../../../../careeradvisor/career.css';

const ReliabilitySection = ({
	title = 'How reliable is this career advisor when discussing changing positions?',
	desc = '',
	onClick,
}) => {
	return (
		<div className="flex w-full flex-col md:flex-row  gap-2 items-start md:items-center justify-between pt-3 px-4 pb-4 main_container">
			{/* Left Section (Text) */}
			<div className="mb-3 md:mb-0 text-center md:text-left ">
				<div className="text-sm text-start font-medium text-[#1A1A1A] tracking-tight">
					{title}
				</div>
				<div className="text-xs font-medium text-start text-[#1A1A1A] tracking-tight">
					{desc}
				</div>
			</div>

			{/* Right Section (Buttons) */}
			<div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3  ">
				{/* Too Low Button */}
				<PrimaryButton
					size="medium"
					buttonText="Too Low"
					varient="seconderyOutline"
					handleClick={() => onClick('Too Low')}
					btnClassName="!border-[#CD2735] !text-[#CD2735] !rounded !text-xs !font-normal text-nowrap !gap-1 !w-full !m-0 !whitespace-normal !break-words transition-transform transform active:scale-95 hover:scale-105 duration-200 ease-in-out"
					startIcon={<img src={TOOLOW_ICON} alt="too low" height={16} />}
				/>

				{/* Accurate Button */}
				<PrimaryButton
					size="medium"
					handleClick={() => onClick('Accurate')}
					buttonText="Accurate"
					varient="seconderyOutline"
					btnClassName="!border-[#FF9900] !text-[#FF9900] !rounded !text-xs !font-normal !w-full !m-0 !px-[2.5rem] !py-1 !overflow-hidden !whitespace-normal !break-words transition-transform transform active:scale-95 hover:scale-105 duration-200 ease-in-out"
					startIcon={<img src={ACCURATE_ICON} alt="accurate" height={16} />}
				/>

				{/* High Button */}
				<PrimaryButton
					handleClick={() => onClick('High')}
					size="medium"
					buttonText="High"
					varient="seconderyOutline"
					btnClassName="!border-[#3ACD3F] !text-[#3ACD3F] !rounded !text-xs !font-normal !w-full !m-0 !whitespace-normal !break-words transition-transform transform active:scale-95 hover:scale-105 duration-200 ease-in-out"
					startIcon={<img src={HIGH_ICON} alt="high" height={16} />}
				/>
			</div>
		</div>
	);
};

export default ReliabilitySection;
