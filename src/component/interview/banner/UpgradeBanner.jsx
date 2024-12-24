import React from 'react';

import '../../interview/interview.css';

const UpgradeBanner = () => {
	return (
		<div className="flex items-center justify-between bg-[#C2FFC4] text-black py-4 px-6 rounded-2xl gap-4">
			<span className="text-base font-medium text-[#000000]">
				Purchase this feature to access it whole
			</span>
			<button className="bg-[#FFFFFF] text-black px-3 py-[6px] rounded-2xl font-semibold text-base cursor-pointer">
				Upgrade Now
			</button>
		</div>
	);
};

export default UpgradeBanner;
