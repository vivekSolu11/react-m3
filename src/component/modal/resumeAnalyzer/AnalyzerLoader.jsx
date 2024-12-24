import { ANALYZER_LOADER_IMG } from 'assets/images';
import React from 'react';

const AnalyzerLoader = () => {
	return (
		<div className="flex flex-col-reverse md:flex-col  gap-[40px] w-full max-w-[784px] ">
			<div className=" text-[16px] md:text-[24px] text-center h-7 p-0 font-[500]">
				Analyzing your resume...
				<div className="text-[#121212A8] md:hidden  text-[14px] text-center">
					Please wait{' '}
					<span className="md:hidden inline">till we analyze your resume</span>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<img
					className="md:max-w-full max-w-[276px] "
					width={362}
					height={319}
					src={ANALYZER_LOADER_IMG}
				/>
				<div className="text-[#121212A8] hidden md:block text-[14px] text-center">
					Please wait!
				</div>
			</div>
		</div>
	);
};

export default AnalyzerLoader;
