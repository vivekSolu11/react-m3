import React from 'react';

import '../../../../careeradvisor/career.css';

const KeyPoints = ({ number, title, content }) => {
	return (
		<div className="pt-2 pb-4 pr-4 pl-2 rounded-lg bg-[#FFFFFF] keypoint_container">
			<div className="pl-2  ">
				<span className="text-sm font-medium text-[#0E8712] bg-[#EDFDED] py-[3px] px-2 rounded-[200px] mr-2">
					{number}
				</span>
				<span className="text-sm font-medium tracking-tight text-[#121212]">{title}</span>
			</div>
			<div className="mt-4 text-xs font-normal text-[#666666] pl-2">
				<ul className="list-disc list-inside md:p-0 pl-[10px]  flex flex-col gap-2">
					{content?.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default KeyPoints;
