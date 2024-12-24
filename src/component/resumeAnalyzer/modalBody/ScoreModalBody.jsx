import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { GREATER_THAN } from 'assets/images';
import { getAnalyzeLabel } from 'utils/common';
import { AnalyzerScoreBg } from 'assets/index';

const ScoreModalBody = ({ Comparision, closeModal }) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		closeModal();
		navigate('/resume/report');
	};

	const { analysisData, previousScore } = useSelector((state) => state.common);
	const score = analysisData?.generalAnalysis?.resumeScore || 0;

	return (
		<div className=" w-full justify-center flex flex-col gap-4 md:gap-[40px] pt-[32px] pb-[40px] px-6 ">
			<div className="flex flex-col-reverse md:flex-col gap-8 md:gap-[40px]">
				<div className="flex items-center flex-col gap-[8px]">
					<div className="flex text-[16px] md:text-[24px] font-[500]">
						Analysis Complete!
					</div>
					<div className="md:flex text-[14px] hidden text-lightText text-center">
						This score is and instant insights into your resume&apos;s performance with
						an AI-powered analysis score, designed to highlight strengths and
						improvement areas.
					</div>
					{/* <div className="flex text-[14px] md:hidden text-lightText">
            Analysis of your resume is Complete
          </div> */}
				</div>
				<div className="flex justify-center  items-center md:gap-[80px]">
					<div className="flex flex-col items-center gap-[16px]">
						<div className="text-[14px] text-lightText font-[500]">
							{Comparision ? 'Previous' : 'Current'} Analysis
						</div>
						<div className="relative  w-[88px] md:w-[125px] h-[88px] md:h-[125px]">
							<AnalyzerScoreBg color={previousScore || score} />

							<div className="absolute top-[27px] md:top-[32px] left-[25px]">
								<span className=" text-[24px] md:text-[40px] font-[500]">
									{previousScore || score}
								</span>
								<span className="md:hidden inline">%</span>{' '}
								<span className="hidden md:inline">/100</span>
							</div>
						</div>
						<div className="normal-case bg-[#F6F6F6] shadow-none font-[500] text-[12px] md:text-[16px] px-4 py-2 rounded-lg">
							{getAnalyzeLabel(previousScore || score)}
						</div>
					</div>
					{Comparision && (
						<>
							<div>
								<img src={GREATER_THAN} height={52} width={52} />
							</div>
							<div className="flex flex-col items-center gap-[16px]">
								<div className="text-[14px] text-lightText font-[500]">
									Current Analysis
								</div>
								<div className="relative w-[88px] md:w-[125px] h-[88px] md:h-[125px]">
									<AnalyzerScoreBg color={score} />
									<div className="absolute top-[27px] md:top-[32px] left-[20px]">
										<span className="text-[24px] md:text-[40px] font-semibold">
											{score}
										</span>
										<span className="md:hidden inline text-[24px] font-semibold">
											%
										</span>
										<span className="hidden md:inline">/100</span>
									</div>
								</div>
								<div className="normal-case bg-[#F6F6F6] shadow-none font-[500] text-[12px] md:text-[16px] px-4 py-2 rounded-lg">
									{getAnalyzeLabel(score)}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<div className="flex justify-center">
				<Button
					variant="contained"
					className="normal-case shadow-none py-[13px] px-[28px] h-[48px] bg-prim-sol tracking-tight rounded-[4px] w-full sm:w-auto text-[14px] md:text-[16px] font-medium"
					onClick={handleNavigate}
				>
					{' '}
					View Analysis
				</Button>
			</div>
		</div>
	);
};

export default ScoreModalBody;
