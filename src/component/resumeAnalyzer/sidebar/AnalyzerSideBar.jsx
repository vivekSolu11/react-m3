import { ANALYZER_SIDEBAR } from 'assets/images';
import React from 'react';

import { AnalysisData } from 'constants/index';

import './AnalyzerSideBar.css';

const AnalyzerSideBar = ({ className }) => {
	return (
		<div
			className={`flex Analyzer-sidebar  flex-col gap-[10px]   w-[328px]   pb-6 ${className}`}
		>
			<div className="bg-[#EDFDED] flex justify-center rounded-[12px] ">
				<img height={178} alt="analyzer sidebar" width={178} src={ANALYZER_SIDEBAR} />
			</div>
			<div className="flex flex-col tracking-tight gap-4">
				<div className="text-[16px] font-medium">How we analyze your Resume?</div>
				<ul className="list-decimal pl-6 gap-4 flex flex-col text-[14px]">
					{AnalysisData.length &&
						AnalysisData.map((item) => (
							<li key={item.title}>
								<div className=" font-[500] pb-2">{item.title}</div>
								<ul className="list-disc pl-1  ">
									{item.steps.map((item) => (
										<li key={item} className="text-[#666666]">
											{item}
										</li>
									))}
								</ul>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default AnalyzerSideBar;
