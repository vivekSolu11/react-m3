import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { useQueryAPI } from 'apis/query';
import { Chips, ShareIcons } from 'component';
import JobDescription from './JobDescription';
import JobsTitles from './JobsTitles';
import { JOBSTARBTN } from 'assets/index';
import JobMatchCard from './JobMatchCard';
import JobsProgress from './JobsProgress';
import { CUSTOMIZE_RESUME_MOBILE, CUSTOMIZE_RESUME_MODAL } from 'constants/modalTypeConstant';
import { showCustomModal, addState } from 'store/sagaActions';
import JobCardMoreOptionMobile from './modal/JobCardMoreOptionMobile';
import { useMediaQuery } from '@mui/material';

import './jobs.css';

const Jobs = ({ job, isSaved, jobListType, appliedAt = '', matchScore }) => {
	const dispatch = useDispatch();
	const isSmallScreen = useMediaQuery('(max-width: 768px)');
	const mobilechatBot = useMediaQuery('(max-width:1280px)');

	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();

	const { fetchJobMatchReason } = useQueryAPI();

	const { userDetails } = useSelector((state) => state.common);
	const { tempCustomModalData } = useSelector((state) => state.modal);

	const isResumeAvailable = userDetails?.profile && userDetails?.profile?.resume?.file;

	const handleAskBuddyClick = (id) => {
		navigate(`/jobs/${id}`);
	};
	const getCardhoverColor = (progressPercentage) => {
		const number = Math.round(progressPercentage);
		switch (true) {
			case number >= 75:
				return 'bg-[#F5FFF5]';
			case number >= 50:
				return 'bg-[#fffbf5]';
			case number >= 0:
				return 'bg-[#FFF5F6]';
		}
	};

	const handleStopPropagation = (e) => {
		e.stopPropagation();
	};

	const handleopenCustomizeModal = (jobUrl) => {
		dispatch(addState({ name: 'jobId', value: job?._id }));
		dispatch(
			addState({
				name: 'jobDetail',
				value: {
					companyName: job?.company?.name,
					positionName: job?.designation?.name,
					companyLogo: job?.companyInfo?.logo,
					jobId: job?._id,
				},
			})
		);
		dispatch(
			showCustomModal({
				customModalType: isSmallScreen ? CUSTOMIZE_RESUME_MOBILE : CUSTOMIZE_RESUME_MODAL,
				tempCustomModalData: {
					url: jobUrl,
					jobId: job?._id,
				},
			})
		);
	};

	const handleAskBuddyBot = () => {
		if (mobilechatBot) {
			dispatch(addState({ name: 'showFullBot', value: true }));
		}
		dispatch(
			addState({
				name: 'jobDetail',
				value: {
					companyName: job?.company?.name,
					positionName: job?.designation?.name,
					companyLogo: job?.companyInfo?.logo,
					jobId: job?._id,
					isChatBot: true,
				},
			})
		);
	};

	const { data } = useQuery({
		queryKey: ['jobMatchReason', job?._id],
		queryFn: () => fetchJobMatchReason(job?._id),
		staleTime: 300000,
		enabled: !!job?._id,
	});

	return (
		<div
			id="jobmdiv"
			className={`flex flex-col md:min-h-[205px] px-4 py-4 md:px-1 md:py-1 md:flex-row w-full rounded-lg cursor-pointer ${
				isHovered ? getCardhoverColor(matchScore?.totalPercentage) : 'bg-[#ffffff]'
			}`}
			onClick={() => handleAskBuddyClick(job?.number?.toString().padStart(8, '0'))}
		>
			{/*  Left Section  */}
			<div className="md:flex-1 flex flex-col justify-between  md:pr-3  md:pl-4 md:!m-0 m-0 relative mobile-card">
				{/* Hide content (job titles, description, and chips) when hover */}

				<div className="relative flex flex-col gap-4 min-h-[113px] md:!p-1 screen-card">
					{isHovered ? (
						<JobMatchCard
							className="jobmatch jobmatchmob"
							{...matchScore}
							matchReason={data?.matchReason}
						/>
					) : (
						<>
							{/*  Job Titles  */}
							<JobsTitles
								companyName={job?.company?.name}
								logo={job?.companyInfo?.logo}
								designationName={job?.designation?.name}
								postedAt={
									job?.postedAt && moment(job?.postedAt).startOf('min').fromNow()
								}
								id={job?._id}
							/>

							<div
								className={`relative gap-2 flex w-full md:max-w-[192px] md:p-[3px] transition-colors duration-300 hoverchang md:hidden`}
							>
								<JobsProgress
									progressPercentage={Math.round(matchScore?.totalPercentage)}
									matchScore={matchScore}
									tags={job?.tags?.match}
								/>
							</div>

							{/*  Job Description  */}
							<JobDescription
								location={job?.location?.city}
								experience={
									job?.experience?.range
										? `${job?.experience?.range?.from} - ${job?.experience?.range?.to}`
										: null
								}
								salary={job?.salary?.description}
								jobType={job?.jobType?.join(' / ')}
								workModel={job?.workModel}
							/>

							{/*  Chips Section  */}
							<div className="flex flex-wrap md:gap-2 gap-1 items-center ">
								{job?.tags?.job.length
									? job?.tags?.job
											?.slice(0, 4)
											.map((chip, i) => (
												<Chips
													key={chip}
													name={chip}
													color={chip?.backgroundColor}
													num={i}
													value={chip}
													className="text-[11px] font-medium py-1 px-2 rounded tracking-tight"
												/>
											))
									: null}
							</div>
						</>
					)}
				</div>

				<hr className="hidden md:block w-full m-0" id="border-down" />
				<div className="justify-end ">
					{/*  Buttons and Share Icons always visible */}
					<div className=" md:flex md:flex-row md:justify-between rightdown pb-1">
						{/* Social Icons */}
						<div
							id="shareicons"
							className="hidden md:flex"
							onClick={handleStopPropagation}
						>
							<ShareIcons
								jobId={job?._id}
								isSaved={isSaved}
								jobNumber={job?.number?.toString().padStart(8, '0')}
								applyUrl={job?.applyUrls?.jobUrl}
							/>
						</div>

						<div className="md:flex gap-2 mt-1">
							<button
								className="gap-2 items-center justify-center text-sm font-medium bg-white py-2 px-3 hidden md:flex h-8 cursor-pointer text-[#333333]"
								id="buddybtn"
								onClick={(e) => {
									handleStopPropagation(e);
									handleAskBuddyBot();
								}}
							>
								<JOBSTARBTN /> Ask Buddy
							</button>

							<button
								className="apply-btn text-[#1A1A1A] text-sm font-medium -tracking-[0.02rem] rounded py-[10px] px-5 md:py-[6px] md:px-3 gap-2 border-none md:rounded-tl-[4px] w-full md:w-auto mt-2 md:mt-0"
								id="applybtn"
								onClick={(e) => {
									handleStopPropagation(e);
									handleopenCustomizeModal(job?.applyUrls?.jobUrl);
								}}
								disabled={jobListType === 'applied'}
							>
								{jobListType === 'applied'
									? `Applied ${moment(appliedAt).startOf('min').fromNow()}`
									: 'Apply Now'}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Right Section: JobsProgress  */}
			<div
				className={`relative gap-2 w-full md:max-w-[192px]  transition-colors duration-300 hoverchang hidden md:flex rounded-[10px] border-0`}
				onMouseEnter={() => {
					if (isResumeAvailable) setIsHovered(true);
				}}
				onMouseLeave={() => setIsHovered(false)}
			>
				<JobsProgress
					progressPercentage={Math.round(matchScore?.totalPercentage)}
					matchScore={matchScore}
					tags={job?.tags?.match}
				/>
			</div>
			{tempCustomModalData?.jobId === job?._id && (
				<JobCardMoreOptionMobile jobId={job?._id} isSaved={isSaved} />
			)}
		</div>
	);
};

export default memo(Jobs);
