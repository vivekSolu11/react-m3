import React from 'react';
import { GreenCheck, RedClose, InfoIcon } from 'assets/index';

const DetailsRowCommon = ({ title, children, status }) => {
	// Determine background color and icon based on status
	const bgColor =
		status === 'Optional'
			? 'bg-[#EBF7EB]'
			: status === 'Critical'
				? 'bg-[#FAF7EB]'
				: 'bg-[#FAF2F3]';

	const Icon = status === 'Optional' ? GreenCheck : status === 'Critical' ? InfoIcon : RedClose;

	return (
		<div className=" flex flex-col gap-[2px] lg:grid grid-cols-3  lg:gap-2">
			<div
				className={`${bgColor} p-4 text-sm flex justify-between items-center font-medium rounded`}
			>
				{title}
				<Icon />
			</div>
			<div
				className={`${bgColor} col-span-2 p-4 text-sm flex items-center font-medium rounded`}
			>
				{children}
			</div>
		</div>
	);
};

export default DetailsRowCommon;
