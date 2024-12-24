import React from 'react';

import { NewsImg } from 'assets/images/index';
import { Clock } from 'assets/index';
const NewsCard = () => {
	return (
		<div className="flex flex-col p-4 md:p-0 mx-auto sm:flex-row gap-6">
			<div className="w-full  flex justify-center item-center sm:max-w-[288px]">
				<img
					src={NewsImg}
					className="rounded-[8px] max-w-[450px]  sm:max-w-[288px] bg-cover w-full"
				/>
			</div>
			<div className="flex flex-col gap-2 justify-start">
				<div className="text-[14px] font-normal text-lightText text-start">Recent News</div>
				<div className="flex flex-col gap-1">
					<div className="text-xl font-medium text-start">Lorem ipsum dolor sit amet</div>
					<div className=" text-[14px] md:text-base font-normal text-lightText text-start">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget
						euismod nulla. Pellentesque luctus eros non tempus vestibulum.
					</div>
					<div className="text-xs font-normal flex items-center gap-1 text-lightText">
						<img height={12} width={12} className="w-[12px] h-[12px]" src={Clock} />
						4d ago
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsCard;
