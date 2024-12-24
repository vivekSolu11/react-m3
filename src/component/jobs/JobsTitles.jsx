import React, { memo } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import Jobtimeicon from 'assets/SVGs/Jobtimeicon';
import SingleStar from 'assets/SVGs/SingleStar';
import { formatNumber } from 'utils/common';
import { COMPANY_DEFAULT } from 'assets/images';
import { useDispatch } from 'react-redux';
import { JOB_CARD_MORE_OPTION } from 'constants/modalTypeConstant';
import { showCustomModal } from 'store/sagaActions';

import './jobs.css';

const JobsTitles = ({
	companyName,
	logo,
	designationName,
	reviewsCount,
	showRatingReview,
	rating,
	postedAt,
	id,
}) => {
	const dispatch = useDispatch();
	return (
		<>
			<div className="flex gap-4 justify-between ">
				<div className="flex items-center gap-3 ">
					<img
						src={logo || COMPANY_DEFAULT}
						alt="companylogo"
						className="h-11 w-11 object-contain"
					/>
					<div className=" flex flex-col gap-1">
						<h2
							className={` m-0  ${showRatingReview ? 'font-medium text-base md:text-xl md:mt-0  -tracking-[0.02rem]' : 'font-medium text-base -tracking-[0.02rem] md:m-0 text-[#1A1A1A]'} ${designationName?.length > 20 ? 'truncate-custom' : ''}`}
						>
							{designationName}
						</h2>
						<div className="flex flex-row gap-2">
							<span className="text-xs font-normal text-[#1A1A1A]">
								{companyName}
							</span>
							{showRatingReview && reviewsCount && rating ? (
								<div className="flex text-xs font-normal gap-1 items-start">
									<div className="text-[#CCCCCC] border-1">|</div>
									<span className="flex items-center gap-1">
										<SingleStar /> {rating?.toFixed(1) || 0}
									</span>
									<div className="text-[#211616] border-1">|</div>
									<span>{formatNumber(reviewsCount || 0)} Reviews </span>
								</div>
							) : null}
						</div>
					</div>
				</div>

				<div className="md:block hidden">
					{!showRatingReview && (
						<span className="text-[11px] -tracking-[0.02rem] font-medium flex justify-center gap-1 text-[#666666]">
							<Jobtimeicon /> {postedAt}
						</span>
					)}
				</div>

				{/* {/ Hide MoreVertOutlinedIcon when showRatingReview is true on mobile view /} */}
				<div
					className={`block md:hidden ${showRatingReview ? 'hidden' : ''}`}
					onClick={(e) => {
						e.stopPropagation();
						dispatch(
							showCustomModal({
								customModalType: JOB_CARD_MORE_OPTION,
								tempCustomModalData: {
									jobId: id,
								},
							})
						);
					}}
				>
					<MoreVertOutlinedIcon className="text-card-icon-outl" />
				</div>
			</div>
		</>
	);
};

export default memo(JobsTitles);
