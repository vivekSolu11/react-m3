import React, { useState } from 'react';
import AnalyzerSideBar from '../sidebar/AnalyzerSideBar';

import './index.css';
const MobileSidebar = () => {
	// State to track whether the sidebar is expanded
	const [isExpanded, setIsExpanded] = useState(false);

	// Toggle function to change between view more and view less
	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<div
			className={` flex rounded-[14px] pt-5 pb-4 px-4 bg-white md:hidden relative ${isExpanded ? '' : 'max-h-[653px]'}`}
		>
			<div className="overflow-hidden rounded-[14px]  ">
				<AnalyzerSideBar className="  w-full  h-full  " />
				<div
					className={`text-[#0E8712] rounded-b-[14px] h-[70px] cursor-pointer ${isExpanded ? '' : ' Analyzer_View_More'} absolute bottom-0  flex justify-center items-end w-full font-medium`}
				>
					<span onClick={toggleExpand} className=" h-5 relative bottom-4">
						{' '}
						{isExpanded ? 'View Less' : 'View More'}
					</span>
				</div>
			</div>
		</div>
	);
};

export default MobileSidebar;
