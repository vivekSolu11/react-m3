import React from 'react';

import { AnalyzerFaq, BetterView, MobileSideBar, UploadResume } from 'component/index';

const ResumeAnalyzer = () => {
	return (
		<div className=" w-full h-full  overflow-y-scroll bg-[#F5F5F5] p-4 md:p-6  flex flex-col gap-6 ">
			<BetterView className="flex md:hidden" />
			<UploadResume />
			<MobileSideBar />
			<AnalyzerFaq />
		</div>
	);
};

export default ResumeAnalyzer;
