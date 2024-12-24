import { SOCIALICON, USERPIC } from 'assets/images';
import moment from 'moment';
import React, { memo } from 'react';

const JobPostDetails = ({ opening, applicants, postedAt, postedBy }) => {
	return (
		<div className="flex flex-wrap md:flex-row items-start md:items-center gap-1 ">
			{/* {/ Posted By Section /} */}
			{postedBy?.name && (
				<div
					className="flex items-center space-x-2
       borderpost"
				>
					<span className="text-xs font-normal -tracking-[0.02rem]">Posted by</span>
					<div className="flex items-center space-x-1">
						<img src={USERPIC} alt="Company Logo" className="w-5 h-5 rounded-full" />
						<span className="font-normal text-sm -tracking-[0.02rem] text-[#121212]">
							{postedBy?.name}
						</span>
						<div className="w-3 h-3 flex items-center">
							<img src={SOCIALICON} alt="Social Icon" className="w-3 h-3" />
						</div>
					</div>
				</div>
			)}

			{/* {/ Date Section /} */}
			<div className="flex items-center space-x-1 borderpost">
				<span className="text-sm font-normal -tracking-[0.02rem] text-[#666666]">
					{moment(postedAt).format('MMMM DD, YYYY')}
				</span>
			</div>

			{/* Wrap Openings and Applicants in a new div for mobile */}
			<div className="flex flex-wrap md:flex-row gap-1 md:gap-2 items-start md:items-center">
				{/* {/ Openings Section /} */}
				{opening ? (
					<div className="flex items-center space-x-1 borderpost">
						<span className="text-sm font-normal -tracking-[0.02rem] text-[#666666]">
							Openings
						</span>
						<span className="text-sm font-medium -tracking-[0.02rem]">{opening}</span>
					</div>
				) : null}

				{/* {/ Applicants Section /} */}
				<div className="flex items-center gap-1">
					<span className="text-sm font-normal -tracking-[0.02rem] text-[#666666]">
						Applicants
					</span>
					<span className="font-medium text-sm -tracking-[0.02rem]">{applicants}</span>
				</div>
			</div>
		</div>
	);
};

export default memo(JobPostDetails);
