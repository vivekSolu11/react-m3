import React, { useState } from 'react';
import { marked } from 'marked';

import JobMatchStar from 'assets/SVGs/JobMatchStar';
import Progress from 'component/progress/progress';
import { getColor } from 'utils/common';

import './jobs.css';

const JobMatchCard = ({
	className,
	matchReason = '',
	experiencePercentage,
	skillPercentage,
	industryPercentage,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className={` ${className}`}>
			{/* Header */}
			<div className={`mb-4 md:mb-0 flex gap-3 bordercss `}>
				<div className="w-5 h-5 mt-3 md:mt-0">
					<JobMatchStar />
				</div>
				<div className="flex flex-col gap-[6px] mt-3 md:m-0">
					<h3 className="text-sm font-medium -tracking-[0.02rem] md:m-0 m-0">
						Why this job is a match?
					</h3>

					<p className="text-xs font-normal  -tracking-[0.02rem] text-[#666666] leading-[18px] md:m-0 m-0">
						{isExpanded ? (
							matchReason
						) : matchReason.length > 100 ? (
							`${matchReason?.slice(0, 90)}...`
						) : (
							<div
								dangerouslySetInnerHTML={{
									__html: marked(matchReason),
								}}
							/>
						)}{' '}
						{matchReason.length > 100 && !isExpanded && (
							<span
								onClick={toggleExpanded}
								className="text-xs text-[#4285F4] underline cursor-pointer  "
							>
								{isExpanded ? 'Show Less' : 'Read More'}
							</span>
						)}
					</p>

					{/* <div className="bordercss"></div> */}
					{/* Match details */}
					<div className="flex gap-6 items-start justify-center md:justify-start md:gap-11 md:flex mt-3 mb-4 custom-style">
						<div className="flex flex-col md:flex-row items-center gap-2 text-[#666666]">
							<Progress
								value={experiencePercentage > 20 ? experiencePercentage : 20}
								className="progressmatch"
								size={36}
								fontSize="10px"
								color={getColor(experiencePercentage)}
								text_Color={getColor(experiencePercentage)}
							/>
							<p className="text-center text-xs font-normal -tracking-[0.02rem]">
								Experience Level
							</p>
						</div>
						<div className="flex flex-col md:flex-row items-center gap-2 text-[#666666]">
							<Progress
								value={skillPercentage > 20 ? skillPercentage : 20}
								className="progressmatch"
								size={36}
								fontSize="10px"
								color={getColor(skillPercentage)}
								text_Color={getColor(skillPercentage)}
							/>
							<p className="text-center text-xs font-normal -tracking-[0.02rem] ">
								Skills
							</p>
						</div>
						<div className="flex flex-col md:flex-row items-center gap-2 text-[#666666]">
							<Progress
								value={industryPercentage > 20 ? industryPercentage : 20}
								className="progressmatch"
								size={36}
								fontSize="10px"
								color={getColor(industryPercentage)}
								text_Color={getColor(industryPercentage)}
							/>
							<p className="text-center text-xs font-normal -tracking-[0.02rem]">
								Industry Experience
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobMatchCard;
