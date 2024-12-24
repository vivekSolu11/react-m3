import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ARROW_ICON, RIGHTC_ICON } from 'assets/images';

import '../../careeradvisor/career.css';
import { useSelector } from 'react-redux';

const CareerHeader = () => {
	const navigate = useNavigate();

	const { selectedDesiredPosition, selectedCurrentPosition } = useSelector(
		(state) => state.careerAdvisor
	);
	// Function to handle back button click
	const handleBackClick = () => {
		navigate('/careeradvisor');
	};

	return (
		<header className="bg-[#EDFDED] gap-2 flex items-center">
			{/* Back Arrow and Title */}
			<button
				className="flex gap-[10px] p-2 rounded-lg bg-[#FFFFFF] back_btn cursor-pointer"
				onClick={handleBackClick}
			>
				{/* Back arrow icon */}
				<img src={ARROW_ICON} alt="" />
			</button>
			<h1 className="text-base font-medium flex flex-wrap gap-x-2 tracking-tight text-[#000000]">
				{selectedCurrentPosition?.name}
				<span className="text-base text-nowrap font-medium tracking-tight text-[#000000]">
					{' '}
					{<img src={RIGHTC_ICON} alt="" className="w-6 h-6 flex items-center" />}{' '}
				</span>
				{selectedDesiredPosition?.name}
			</h1>
		</header>
	);
};

export default CareerHeader;
