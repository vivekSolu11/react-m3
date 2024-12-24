import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import AnalysisHeader from './subComponents/AnalysisHeader';
import EditTemplateList from 'component/resumeBuilder/editTemplateList/editTemplateList';
import SideDrawer from 'component/common/drawer/Drawer';
import FullReportDrawer from 'component/resumeAnalyzer/drawer/FullReportDrawer';
import FixSummary from 'component/resumeAnalyzer/drawer/FixSummary';
import FixExperience from 'component/resumeAnalyzer/drawer/FixExperience';
import { addState } from 'store/sagaActions';

import './AnalysisReport.css';

export const SummaryHeader = () => {
	const { fixesTitle, fixes } = useSelector((state) => state.common);

	return (
		<div className="flex flex-col gap-2">
			<div className="text-[20px] text-[#121212]">{fixesTitle}</div>
			<div className="flex text-[16px] gap-[10px] ">
				{fixes?.issuesCount?.urgentIssuesCount > 0 && (
					<>
						<div className="text-[#CD2735]">
							{fixes?.issuesCount?.urgentIssuesCount} Urgent{' '}
						</div>
					</>
				)}
				{/* <span className="text-[#666666] text-[16px]">&middot;</span> */}
				{fixes?.issuesCount?.criticalIssuesCount > 0 && (
					<div className="text-[#F5781D] ">
						{fixes?.issuesCount?.criticalIssuesCount} Critical
					</div>
				)}

				{fixes?.issuesCount?.optionalIssuesCount > 0 && (
					<div className="text-[#4285F4] ">
						{fixes?.issuesCount?.optionalIssuesCount} Optional
					</div>
				)}
			</div>
		</div>
	);
};

export const ExperienceHeader = () => {
	const urgent = true;
	const critical = true;

	return (
		<div className="flex flex-col gap-2">
			<div className="text-[20px] text-[#121212]">Fixing Work Experience</div>
			<div className="flex text-[16px] gap-[10px] ">
				{urgent && <div className="text-[#CD2735]">2 Urgent </div>}{' '}
				<span className="text-[#666666] text-[16px]">&middot;</span>
				{critical && <div className="text-[#F5781D] ">3 Critical</div>}
			</div>
		</div>
	);
};

const AnalysisReport = () => {
	// Manage separate states for each drawer
	const { fixSummary } = useSelector((state) => state.common);
	const { fixExperience } = useSelector((state) => state.common);
	const isSmallScreen = useMediaQuery('(max-width: 640px)');

	const dispatch = useDispatch();
	const [isFullReportOpen, setIsFullReportOpen] = useState();
	const [isFixSummaryOpen, setIsFixSummaryOpen] = useState(fixSummary || false);
	const [isFixExperienceOpen, setIsFixExperienceOpen] = useState(fixExperience || false);

	const { analysisData } = useSelector((state) => state.common);

	useEffect(() => {
		if (fixSummary) {
			setIsFixSummaryOpen(true);
		}
	}, [fixSummary]);
	useEffect(() => {
		if (fixExperience) {
			setIsFixExperienceOpen(true);
		}
	}, [fixExperience]);

	// Function to handle toggling for each drawer
	const toggleFullReportDrawer = (newOpen) => () => {
		setIsFullReportOpen(newOpen);
	};

	const toggleFixSummaryDrawer = (newOpen) => () => {
		setIsFixSummaryOpen(newOpen);
		dispatch(addState({ name: 'fixSummary', value: false }));
	};
	const toggleFixExperienceDrawer = (newOpen) => () => {
		setIsFixExperienceOpen(newOpen);
		dispatch(addState({ name: 'fixExperience', value: false }));
	};

	const FullReportHeader = () => {
		return (
			<div className="flex flex-col gap-2">
				<div className="text-[20px] text-[#121212]">Full Report</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col bg-white rounded-t-[14px]">
			<AnalysisHeader
				isViewReport={true}
				// Open Full Report Drawer on handle
				onHandleDrawer={() => setIsFullReportOpen(true)}
				count={analysisData?.grandTotalIssues}
				score={analysisData?.generalAnalysis?.resumeScore || analysisData?.resumeScore}
			/>
			<EditTemplateList
				className="!h-full overflow-hidden"
				profilestyle="md:grid-cols-3 "
				isAnalysis={true}
				// Open Fix Summary Drawer from EditTemplateList
				// handleFixSummary={() => setIsFixSummaryOpen(true)}
			/>
			{/* Full Report Drawer */}
			<SideDrawer
				width={672}
				openFrom={isSmallScreen ? 'bottom' : 'right'}
				bodyClass="!h-[calc(100vh-72px)]"
				open={isFullReportOpen}
				onClose={toggleFullReportDrawer(false)}
				title={<FullReportHeader />}
			>
				<FullReportDrawer onClose={toggleFullReportDrawer(false)} />
			</SideDrawer>

			{/* Fix Summary Drawer */}
			<SideDrawer
				width={672}
				bodyClass="!h-[calc(100vh-108px)]"
				openFrom={isSmallScreen ? 'bottom' : 'right'}
				open={isFixSummaryOpen}
				onClose={toggleFixSummaryDrawer(false)}
				title={<SummaryHeader />}
				iconCss="flex items-center"
			>
				<FixSummary onClose={toggleFixSummaryDrawer(false)} />
			</SideDrawer>

			<SideDrawer
				width={672}
				drawerClass="max-w-[672px] w-full"
				bodyClass="!h-[calc(100vh-108px)]"
				open={isFixExperienceOpen}
				openFrom={isSmallScreen ? 'bottom' : 'right'}
				onClose={toggleFixExperienceDrawer(false)}
				title={<ExperienceHeader />}
				iconCss="flex items-center"
			>
				<FixExperience onClose={toggleFixExperienceDrawer(false)} />
			</SideDrawer>
		</div>
	);
};

export default AnalysisReport;
