import React from 'react';

import '../../../../careeradvisor/career.css';
import { COMPANY_DEFAULT, LOCATION_ICON, UPARROW_ICON } from 'assets/images';
import { useNavigate } from 'react-router-dom';

const JobOpening = ({ title, company, location, imageUrl, number }) => {
	const navigate = useNavigate();

	const handleAskBuddyClick = (id) => {
		navigate(`/jobs/${id}`);
	};
	return (
		<div className="p-4 rounded-lg bg-[#FFFFFF] jobopening_container flex flex-col gap-2">
			<div className="">
				<div className="flex items-center gap-1 relative">
					<img
						src={imageUrl || COMPANY_DEFAULT}
						alt={`${company} logo`}
						className="w-4 h-4 "
					/>
					<p className="text-xs font-normal text-[#1A1A1A] tracking-tight m-0">
						{company}
					</p>
					{/* Upward Arrow Icon */}
					<div
						onClick={() => {
							handleAskBuddyClick(number?.toString().padStart(8, '0'));
						}}
						className="absolute right-1 uparrow_icon px-2.5 py-2.5 rounded-full flex items-center justify-center cursor-pointer"
					>
						<img src={UPARROW_ICON} alt="uparrow" className="w-2 h-2" />
					</div>
				</div>
				<h3 className="font-semibold mt-2 mb-0">{title}</h3>
			</div>
			<div className="flex gap-[2.5px] items-center">
				<img src={LOCATION_ICON} alt="locationicon" className="w-4 h-4" />
				<p className="text-sm font-normal tracking-tight text-[#1A1A1A] m-0">{location}</p>
			</div>
		</div>
	);
};

export default JobOpening;
