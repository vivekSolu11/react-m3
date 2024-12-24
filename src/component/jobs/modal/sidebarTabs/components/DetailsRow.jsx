import React from 'react';
import { GreenCheck, InfoIcon, RedClose } from 'assets/index';

const DetailsRow = ({ title, descOne, descTwo, status }) => {
	// Determine background color and icon based on status
	const bgColor =
		status === 'Optional'
			? 'bg-[#EBF7EB]'
			: status === 'Critical'
				? 'bg-[#FAF7EB]'
				: 'bg-[#FAF2F3]';

	const Icon = status === 'Optional' ? GreenCheck : status === 'Critical' ? InfoIcon : RedClose;

	return (
		<div className=" flex flex-col lg:grid grid-cols-3 gap-[2px] lg:gap-2">
			<div
				className={`${bgColor} p-4 text-sm flex justify-between items-center font-medium rounded`}
			>
				{title}
				<Icon />
			</div>
			<div className={`${bgColor} p-4 text-sm flex items-center font-medium rounded`}>
				{descOne}
			</div>
			<div className={`${bgColor} p-4 text-sm flex items-center font-medium rounded`}>
				{descTwo}
			</div>
		</div>
	);
};

export default DetailsRow;
