import React from 'react';

import PopularResume from 'component/resumeList/popularResume/PopularResume';
import OtherResume from 'component/resumeList/otherResume/OtherResume';
import ResumePreview from 'component/resumeBuilder/resumePreview/ResumePreview';

import './sidebar.css';

const TabFour = () => {
	return (
		<div className="flex  w-full gap-3 items-center justify-center overflow-y-auto overflow-hide  ">
			<div className=" hidden lg:flex w-3/5  text-center  border border-solid border-lightgray h-full">
				<ResumePreview showSectionCompletion={false} sectionClass="h-full" />
			</div>
			<div className=" w-full lg:w-2/5 h-full rounded-lg flex flex-col gap-6 overflow-y-auto overflow-hide ">
				<div className=" text-base font-medium text-black">Select Templates</div>
				<div className="flex flex-col gap-2">
					<div className=" text-sm font-medium text-[#121212]">Popular Template</div>

					<PopularResume isRedirect={false} showPreview={false} />
				</div>
				<div className="flex flex-col gap-2">
					<div className=" text-sm font-medium text-[#121212]">Other Template</div>
					<OtherResume isRedirect={false} showPreview={false} />
				</div>
			</div>
		</div>
	);
};

export default TabFour;
