import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { OpenInIcon, CloseArrowIcon } from 'assets/index';
import Progress from 'component/progress/progress';
import JobMatchCard from './JobMatchCard';
import { getColor } from 'utils/common';

import './jobs.css';

const JobDetailsProgress = ({ matchScore, setOpenCard, matchReason }) => {
	const navigate = useNavigate();
	const [isMatchCardOpen, setIsMatchCardOpen] = useState(false);

	const { userDetails } = useSelector((state) => state.common);
	const isResumeAvailable = userDetails?.profile && userDetails?.profile?.resume?.file;

	const handleToggleMatchCard = () => {
		setIsMatchCardOpen(!isMatchCardOpen);
		setOpenCard((prev) => !prev);
	};

	function evaluateScore(score) {
		const number = Math.round(score);
		if (number >= 75) {
			return 'Great';
		} else if (number >= 50 && number < 75) {
			return 'Average';
		} else {
			return 'Poor';
		}
	}

	const getHoverTextColor = (progressPercentage = 0) => {
		const number = Math.round(progressPercentage);
		switch (true) {
			case number >= 75:
				return '#0E8712';
			case number >= 50 && number < 75:
				return '#CD9027';
			case number >= 0 && number < 50:
				return '#CD2735';
		}
	};

	const getCardBackgroundColor = (progressPercentage = 0) => {
		if (!isResumeAvailable) {
			return 'bg-great-custom';
		}
		const number = Math.round(progressPercentage);

		switch (true) {
			case number >= 75:
				return 'bg-great-custom';
			case number >= 50 && number < 75:
				return 'bg-average-custom';
			case number >= 0 && number < 50:
				return 'bg-bad-custom';
			default:
				return 'bg-gray-custom';
		}
	};

	return (
		<div
			className={`md:relative px-4  rounded-[9px] flex flex-col md:flex-row items-center justify-center transition-all duration-300  md:min-h-[154px] ${getCardBackgroundColor(matchScore?.totalPercentage)} compability cursor-pointer `}
		>
			{/* Progress and status */}
			{isResumeAvailable ? (
				<div className="flex justify-between md:justify-center w-full items-center">
					<div className="flex flex-row md:flex-col items-center gap-3 md:justify-center md:gap-6 py-3 px-[3px]">
						<div className="flex justify-center items-center">
							<Progress
								id="progress"
								value={
									matchScore?.totalPercentage > 30
										? matchScore?.totalPercentage
										: 30
								}
								size={54}
								color={getColor(matchScore?.totalPercentage)}
								text_Color={getColor(matchScore?.totalPercentage)}
							/>
						</div>
						<div className="text-center flex md:flex-col flex-row items-center gap-2">
							<div
								className="text-base font-semibold "
								style={{
									color: getHoverTextColor(matchScore?.totalPercentage),
								}}
							>
								{evaluateScore(matchScore?.totalPercentage)}
							</div>
							<div
								className="text-[10px] font-normal flex items-center "
								style={{
									color: getHoverTextColor(matchScore?.totalPercentage),
								}}
							>
								MATCH
							</div>
						</div>
					</div>
					<div
						className=" md:absolute md:top-2 md:right-2 top-[36%] right-[19px]"
						onClick={handleToggleMatchCard}
					>
						{isMatchCardOpen ? (
							<CloseArrowIcon className="cursor-pointer" />
						) : (
							<OpenInIcon className="cursor-pointer" />
						)}
					</div>
				</div>
			) : (
				<div
					className="transition-colors flex-col gap-1 duration-300 md:flex min-h-full justify-center align-center h-14"
					onClick={() => navigate('/profile/edit')}
				>
					<span className="flex gap-1 text-xs font-medium text-[#121212] -tracking-[0.02rem] text-center">
						Please upload your resume to check the job score card
					</span>
				</div>
			)}

			{isMatchCardOpen && (
				<div className="w-full md:hidden block">
					<JobMatchCard {...matchScore} matchReason={matchReason} />
				</div>
			)}
		</div>
	);
};

export default JobDetailsProgress;
