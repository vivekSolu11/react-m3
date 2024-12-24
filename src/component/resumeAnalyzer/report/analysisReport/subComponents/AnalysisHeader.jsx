import React from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { VIEW_REPORT } from 'assets/images';
import { AnalyzerScoreBg } from 'assets/index';
import { getAnalyzeLabel } from 'utils/common';
import Fixes from './Fixes';

const AnalysisHeader = ({
	onHandleDrawer,
	isViewReport,
	imgSize,
	isCol = false,
	layoutClass,
	scorePosition,
	score,
	count,
}) => {
	const { issueCount } = useSelector((state) => state.common);

	return (
		<div
			className={`w-full justify-between flex pt-[20px] pb-4 px-4 md:px-6 flex-wrap xl:flex-nowrap gap-4 ${layoutClass} `}
		>
			<div className="  flex gap-4  leading-none">
				<div className="relative">
					<AnalyzerScoreBg color={score} className={` h-[88px] w-[88px] ${imgSize} `} />
					<div
						className={`absolute  text-[24px] font-semibold top-[36%] left-[24%] ${scorePosition}`}
					>
						{score}%
					</div>{' '}
				</div>
				<div className="flex md:items-center  items-start justify-center flex-wrap  gap-2 md:gap-6 flex-col md:flex-row">
					<div className="text-[24px] font-[600]">{getAnalyzeLabel(score)}</div>
					{isViewReport && (
						<Button
							onClick={onHandleDrawer}
							className="flex gap-2 border-[#60DD64] rounded-[4px] px-[12px] py-[6px] h-8 normal-case text-[14px] font-medium"
							variant="outlined"
						>
							<img width={16} height={16} src={VIEW_REPORT} />
							<span className="text-[#0E8712]"> View full Report</span>
						</Button>
					)}
				</div>
			</div>
			<div className="flex w-full xl:w-auto md:gap-2 md:justify-end sm: gap-1  items-center">
				<Fixes
					className="bg-[#FCEEEF]   border-[#F2707B] text-[#CD2735]"
					isCol={isCol}
					TagColor="bg-[#CD2735]"
					count={isViewReport ? issueCount?.urgent : count?.urgent}
					fixType={'Urgent'}
				/>
				<Fixes
					className="bg-[#FFF6EB]   border-[#FF9518] text-[#A35800]"
					TagColor="bg-[#FF9518]"
					isCol={isCol}
					count={isViewReport ? issueCount?.critical : count?.critical}
					fixType={'Critical'}
				/>
				<Fixes
					className="bg-[#ECF3FE]   border-[#4285F4] text-[#4285F4]"
					TagColor="bg-[#4285F4]"
					isCol={isCol}
					count={isViewReport ? issueCount?.optional : count?.optional}
					fixType={'Optional'}
				/>
			</div>
		</div>
	);
};

export default AnalysisHeader;
