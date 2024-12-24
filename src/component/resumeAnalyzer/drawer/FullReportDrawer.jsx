import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import AnalysisHeader from '../report/analysisReport/subComponents/AnalysisHeader';
import { StarIcon } from 'assets/index';

import './index.css';

const FullReportDrawer = ({ onClose }) => {
	const { reportData, issueCount } = useSelector((state) => state.common);

	return (
		<div className="px-4 h-full   ">
			<div className="  flex flex-col gap-6 h-[calc(100vh-142px)] overflow-y-auto ">
				<AnalysisHeader
					isViewReport={false}
					layoutClass="!px-0"
					imgSize="  "
					isCol={true}
					count={issueCount}
					score={reportData?.score}
				/>
				<div className="Analysis-container ">
					<div className="Analysis-title">Analysis Summary</div>
					<div className="Analysis-data">{reportData?.summary}</div>
				</div>
				<div className="Analysis-container">
					<div className="Analysis-title ">Analysis Highlights</div>
					<div className=" flex flex-col gap-4  ">
						{Object.keys(reportData).length &&
							Object.keys(reportData)
								.filter(
									(item) =>
										item !== 'score' && item !== 'summary' && item !== 'states'
								)
								.map((item, index) => (
									<>
										{item === 'score' ||
										item === 'summary' ||
										item === 'tates' ||
										item === 'states' ? null : (
											<div className="  " key={item?.title}>
												<div className="Analysis-issue-title flex gap-3 ">
													<span className="text-[#0E3C87]">
														{index + 1}
													</span>
													<span>{reportData[item]?.title}</span>
												</div>
												<div className="flex flex-col gap-4 pl-8">
													<div className="Analysis-data  ">
														{reportData[item]?.whyImportantShort}
													</div>
													{reportData[item]?.urgent?.length > 0 && (
														<div className="flex flex-col gap-2">
															<ul className="pl-4 text-[14px] font-[500] text-[#CD2735]">
																<li>Urgent Issues</li>
															</ul>
															{reportData[item]?.urgent?.length > 0 &&
																reportData[item]?.urgent?.map(
																	(item) => (
																		<div key={item?.title}>
																			<div className="bg-[#FFF5F6] rounded-lg p-3">
																				<div className="flex flex-wrap Analysis-issue-heading  ">
																					{item?.title}
																					{''}
																					<span className="font-normal text-[14px] px-[5px]">
																						·{' '}
																						{
																							item?.number
																						}{' '}
																						issues
																						related
																					</span>
																				</div>
																				<div className="Analysis-issue-data ">
																					{item?.data}
																				</div>
																			</div>
																		</div>
																	)
																)}
														</div>
													)}
													{reportData[item]?.critical?.length > 0 && (
														<div className="flex flex-col gap-2">
															<ul className="pl-4 text-[14px] font-[500] text-[#CD2735]">
																<li>Critical Issues</li>
															</ul>
															{reportData[item]?.critical?.length >
																0 &&
																reportData[item]?.critical?.map(
																	(item) => (
																		<div key={item?.title}>
																			<div className="bg-[#FFF5F6] rounded-lg p-3">
																				<div className="flex flex-wrap Analysis-issue-heading  ">
																					{item?.title}{' '}
																					<span className="font-normal text-[14px] px-[5px]">
																						·{' '}
																						{
																							item?.number
																						}{' '}
																						issues
																						related
																					</span>
																				</div>
																				<div className="Analysis-issue-data ">
																					{item?.data}
																				</div>
																			</div>
																		</div>
																	)
																)}
														</div>
													)}
													{reportData[item]?.optional?.length > 0 && (
														<div className="flex flex-col gap-2">
															<ul className="pl-4 text-[14px] font-[500] text-[#CD2735]">
																<li>Optional Issues</li>
															</ul>
															{reportData[item]?.optional?.length >
																0 &&
																reportData[item]?.optional?.map(
																	(item) => (
																		<div key={item?.title}>
																			<div className="bg-[#FFF5F6] rounded-lg p-3">
																				<div className="flex flex-wrap Analysis-issue-heading  ">
																					{item?.title}{' '}
																					<span className="font-normal text-[14px] px-[5px]">
																						·{' '}
																						{
																							item?.number
																						}{' '}
																						issues
																						related
																					</span>
																				</div>
																				<div className="Analysis-issue-data ">
																					{item?.data}
																				</div>
																			</div>
																		</div>
																	)
																)}
														</div>
													)}
												</div>
											</div>
										)}
									</>
								))}
					</div>
				</div>
			</div>
			<div className="flex ai-container  justify-center py-4 ">
				<Button
					variant=""
					onClick={onClose}
					className="btn-gradient  cursor-pointer normal-case text-[#1A1A1A]  justify-center items-center"
				>
					{' '}
					<div className="flex items-center gap-2">
						<span className="flex justify-center items-center h-5 w-5">
							<StarIcon black />
						</span>{' '}
						<span className="text-[14px] ">Begin Improvements Now</span>{' '}
					</div>{' '}
				</Button>
			</div>
		</div>
	);
};

export default FullReportDrawer;
