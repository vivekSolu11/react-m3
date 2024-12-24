import React from 'react';

import {
	DURATIONS_ICON,
	PRICE_ICON,
	Rate_ICON,
	TYPE_ICON,
	UPARROW_ICON,
	COURSERA_ICON,
	EDX_ICON,
	UDEMY_ICON,
	UDACITY_ICON,
	COURSE_ICON,
} from 'assets/images';

import '../../../../careeradvisor/career.css';

const img = {
	edX: EDX_ICON,
	Udemy: UDEMY_ICON,
	Coursera: COURSERA_ICON,
	Udacity: UDACITY_ICON,
};
const CoursesList = ({
	platform,
	courseName,
	currency,
	duration,
	price,
	averageRating,
	reviewsTotalCounts,
	type,
	isPaid,
	link,
}) => {
	return (
		<div className="bg-[#FFFFFF] rounded-lg space-y-5 p-4 w-full h-auto courdeslist_container ">
			<div className="flex  gap-2 relative">
				<div className="flex w-full flex-col gap-2 relative">
					<div className="flex items-center gap-1">
						<img
							src={img[platform] || COURSE_ICON}
							alt={`${platform} icon`}
							className="w-4 h-4"
						/>
						<h3 className="text-xs font-normal tracking-tight text-[#1A1A1A] m-0">
							{platform}
						</h3>
					</div>

					<h4 className="text-sm font-medium tracking-tight text-[#000000] m-0">
						{courseName}
					</h4>
				</div>
				<div className=" uparrow_icon h-9 w-9 rounded-full flex items-center justify-center cursor-pointer">
					<a href={link} target="_blank" rel="noreferrer">
						<img src={UPARROW_ICON} alt="uparrow" className="w-2 h-2" />
					</a>
				</div>
			</div>

			<div className="flex flex-col gap-2 mt-4">
				<div className="flex justify-between">
					<div className="flex gap-2 items-center flex-[1_1_50%]">
						<img src={TYPE_ICON} alt="priceicon" className="w-4 h-4" />
						<p className="text-sm font-normal tracking-tight text-[#1A1A1A] m-0">
							{type}
						</p>
					</div>
					{/* Course Details */}
					<div className="flex gap-2 items-center  flex-[1_1_50%]">
						<img src={DURATIONS_ICON} alt="priceicon" className="w-4 h-4" />
						<p className="text-sm font-normal tracking-tight text-[#1A1A1A] m-0">
							{duration}
						</p>
					</div>
				</div>

				<div className="flex justify-between">
					<div className="flex gap-2 items-center flex-[1_1_50%]">
						{currency === 'USD' ? (
							<p className=" m-0">{currency}</p>
						) : (
							<img src={PRICE_ICON} alt="priceicon" className="w-4 h-4" />
						)}

						<p className="text-sm font-normal tracking-tight text-[#1A1A1A] m-0">
							{isPaid ? price : 'Free'}
						</p>
					</div>

					{/* Course averageRating */}
					<div className="flex gap-2 items-center text-sm font-normal tracking-tight text-[#1A1A1A] flex-[1_1_50%] ">
						<img src={Rate_ICON} alt="rate" className="w-4 h-4" />
						<span>{averageRating}</span>
						<span>({reviewsTotalCounts} reviews)</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursesList;
