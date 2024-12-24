import React from 'react';

import '../../../../careeradvisor/career.css';

const JobJourneyCard = ({ title, children }) => {
	return (
		<div className="bg-[#FFFFFF] rounded-lg headcard_container mt-4 relative h-[135px] max-w-[165px] w-full flex flex-col justify-between">
			<h3 className="text-sm font-medium tracking-tight text-[#1A1A1A] m-0 p-3 pb-0 z-[1]">
				{title}
			</h3>
			<div className="flex gap-2">{children}</div>
		</div>
	);
};

export default JobJourneyCard;
