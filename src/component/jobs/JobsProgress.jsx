import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

import { OpenInIcon, CloseArrowIcon } from 'assets/index';
import Progress from '../progress/progress';
import JobMatchCard from './JobMatchCard';

import './jobs.css';

function evaluateScore(score) {
	if (score >= 75) {
		return 'Great';
	} else if (score >= 50 && score < 75) {
		return 'Average';
	} else {
		return 'Poor';
	}
}

const JobsProgress = ({ progressPercentage, matchScore, tags }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isMatchCardOpen, setIsMatchCardOpen] = useState(false);
	const isMd = useMediaQuery('(min-width:768px)');
	// Background and hover colors
	const navigate = useNavigate();
	const { userDetails } = useSelector((state) => state.common);

	const scoreValue =
		userDetails?.profile && userDetails?.profile?.resume?.file ? progressPercentage : 100;

	const isResumeAvailable = userDetails?.profile && userDetails?.profile?.resume?.file;

	const getCardBackgroundColor = (progressPercentage = 0) => {
		switch (true) {
			case progressPercentage >= 75:
				return 'bg-great-custom';
			case progressPercentage >= 50 && progressPercentage < 75:
				return 'bg-average-custom';
			case progressPercentage >= 0 && progressPercentage < 50:
				return 'bg-bad-custom';
			default:
				return 'bg-gray-custom';
		}
	};

	// styles for text color
	const getHoverTextColor = (progressPercentage = 0) => {
		if (isHovered && isMd) {
			switch (true) {
				case progressPercentage >= 75:
					return '#8DE990';
				case progressPercentage >= 50 && progressPercentage < 75:
					return '#F2C370';
				case progressPercentage >= 0 && progressPercentage < 50:
					return '#F2707B';
			}
		} else {
			switch (true) {
				case progressPercentage >= 75:
					return '#0E8712';
				case progressPercentage >= 50 && progressPercentage < 75:
					return '#CD9027';
				case progressPercentage >= 0 && progressPercentage < 50:
					return '#CD2735';
			}
		}

		return '';
	};

	const handleToggleMatchCard = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsMatchCardOpen(!isMatchCardOpen);
	};

	const handleMouseEnter = () => {
		if (isResumeAvailable) {
			setIsHovered(true);
		}
	};

	return (
		<div
			id="progcardbor"
			className={`relative w-full p-3 flex flex-col justify-between   md:items-center cursor-pointer ${getCardBackgroundColor(scoreValue)} compability ${isResumeAvailable && 'hoverchang'}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isResumeAvailable ? (
				<>
					<div className="flex items-center gap-2  md:justify-between md:block">
						{/* {/ Circular percentage area /} */}
						<div className="flex gap-3 md:gap-2  md:flex-col">
							<div className="flex justify-center items-center md:mb-0">
								<Progress
									id="progress"
									value={progressPercentage > 30 ? progressPercentage : 30}
									size={56}
									color={getHoverTextColor(progressPercentage)} //
									text_Color={getHoverTextColor(progressPercentage)}
								/>
							</div>

							{/* {/ Status /} */}
							<div className="flex md:flex-col items-center gap-2 md:gap-0">
								<div
									id="status"
									className={`font-semibold text-base md:text-xl -tracking-[0.02rem]`}
									style={{ color: getHoverTextColor(progressPercentage) }}
								>
									{evaluateScore(progressPercentage)}
								</div>
								<div
									id="match"
									className={`text-base font-semibold -tracking-[0.02rem]  md:text-[10px] md:font-normal`}
									style={{ color: getHoverTextColor(progressPercentage) }}
								>
									Match
								</div>
							</div>
							{/* {/ Arrow icon on mobile /} */}
							<div
								className="absolute  top-[30px] right-[22px] md:hidden"
								onClick={handleToggleMatchCard}
							>
								{isMatchCardOpen ? (
									<CloseArrowIcon className="cursor-pointer" />
								) : (
									<OpenInIcon className="cursor-pointer" />
								)}
							</div>
						</div>
					</div>
					{/* JobMatchCard - Render when open */}
					{isMatchCardOpen && (
						<div className="w-full md:hidden block">
							<JobMatchCard {...matchScore} />
						</div>
					)}
					{/* {/ Bullet points /} */}
					<div className="transition-colors flex-col gap-1 duration-300 hidden md:flex">
						{tags?.length
							? tags?.slice(0, 4)?.map((tag) => (
									<span
										className="flex gap-1 text-xs font-normal -tracking-[0.02rem]"
										style={{ color: isHovered ? 'white' : '' }}
										key={tag}
									>
										<CheckIcon className="w-4 h-4" />
										{tag}
									</span>
								))
							: null}
					</div>{' '}
				</>
			) : (
				<div
					className="transition-colors flex-col gap-1 duration-300 md:flex min-h-full justify-center align-center h-14"
					onClick={(e) => {
						e.stopPropagation();
						navigate('/profile/edit');
					}}
				>
					<span className="flex gap-1 text-xs font-medium text-[#121212] -tracking-[0.02rem] text-center">
						Please upload your resume to check the job score card
					</span>
				</div>
			)}
		</div>
	);
};

export default JobsProgress;
