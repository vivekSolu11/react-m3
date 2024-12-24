import React from 'react';
import { useMediaQuery } from '@mui/material';

import ItemLayout from './itemLayout/ItemLayout';
import { ResumeAnalysisImg, ResumeAnalysisImgMob } from 'assets/images';

const ResumeAnalysis = ({ isHome }) => {
	const isMobile = useMediaQuery('(max-width: 768px)');

	return (
		<ItemLayout
			isleft={true}
			title={
				<>
					{isHome ? (
						<span className="inline  font-normal">
							<strong>Build and analyze resume </strong>
						</span>
					) : (
						<>
							<span className="hidden md:inline">
								<span className="font-[600]">AI Resume Analysis</span>
								<span> basis your job</span>
							</span>

							{/* For small screens (below md) */}
							<span className="inline md:hidden text-xl font-normal text-[#1A1A1A]">
								<strong>Build and analyze resume </strong>
							</span>
						</>
					)}
				</>
			}
			description="Elevate your resume with personalized AI-powered insights. Get tailored feedback on grammar, formatting, and key skills to ensure your resume stands out and captures the attention of recruiters."
			buttonText="Try Now"
			src={isMobile ? ResumeAnalysisImgMob : ResumeAnalysisImg}
			// src={ResumeAnalysisImg}
			// ResumeAnalysisImgMob
			// height="h-[760px]"
		></ItemLayout>
	);
};

export default ResumeAnalysis;
