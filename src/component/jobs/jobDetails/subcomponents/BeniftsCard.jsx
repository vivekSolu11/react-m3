import React from 'react';

import './index.css';
const BeniftsCard = ({ title, img, desc }) => {
	return (
		<div className=" borderreview rounded-[8px]  w-full flex flex-col  md:h-[284px] p-4 box-border ">
			<div className="flex flex-col justify-start ">
				<div className="relative  flex  h-[48px] w-[85px]">
					<img
						className="flex -left-12 -top-6  bg-cover absolute  "
						src={img}
						alt="cover"
					/>
				</div>
				<div className="text-[14px] font-medium tracking-tighter">{title}</div>
			</div>
			<ul className="description pl-[20px]">
				{desc?.length && desc?.map((item) => <li key={item}>{item}</li>)}
			</ul>
		</div>
	);
};

export default BeniftsCard;
