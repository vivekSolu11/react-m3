import React from 'react';

import { CircularProgressWithLabel } from './Progressbar';
const RatingCard = ({ value = 0, text = '' }) => {
	return (
		<div className="flex flex-col items-center max-w-[92px] md:max-w-[105px] w-full">
			<div className="">
				<CircularProgressWithLabel color="#76FF7A" value={value} />
			</div>
			<div className="text-center md:text-sm text-[12px] text-[#666666]">{text}</div>
		</div>
	);
};

export default RatingCard;
