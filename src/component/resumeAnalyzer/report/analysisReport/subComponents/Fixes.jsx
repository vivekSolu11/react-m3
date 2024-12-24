import React from 'react';
import './index.css';
const Fixes = ({ className, count, fixType, TagColor, isCol }) => {
	if (count <= 0) return null;
	return (
		<div
			className={`${className} rounded-lg tracking-tight text-[14px] Fixes-border overflow-hidden  `}
		>
			<div
				className={`h-1  relative flex rounded-xl   w-full bottom-0  ${TagColor} left-0`}
			/>
			<div
				className={` w-[94px] sm:w-auto  sm:px-[16px] pb-2 pt-[6px] flex flex-col items-center md:flex md:flex-row  md:items-center md:gap-1   ${isCol ? 'flex flex-col items-center md:flex-col' : ''} `}
			>
				<span className=" text-[14px] md:text-[20px]  font-[500]">{count || 0}</span>
				<span className="whitespace-nowrap tracking-tight text-[12px] md:text-[14px]">
					{' '}
					{fixType} Fixes{' '}
				</span>{' '}
			</div>
		</div>
	);
};

export default Fixes;
