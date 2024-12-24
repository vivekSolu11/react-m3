import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import JobsTitles from './JobsTitles';
import { useQueryAPI } from 'apis/query';
import ShareIcons from 'component/customComponents/icons/ShareIcons';
import Chips from 'component/customComponents/chips/Chips';
import JobDetailsProgress from './JobDetailsProgress';
import JobDescription from './JobDescription';
import JobPostDetails from './JobsPostDetails';
import JobMatchCard from './JobMatchCard';

const JobsDetails = ({ job, showRatingReview, jobdetailview }) => {
	const [isOpenCard, setOpenCard] = useState(false);
	const { JobDetails } = useSelector((state) => state.common);

	const { fetchJobMatchReason } = useQueryAPI();

	const getCardBackgroundColor = (progressPercentage = 0) => {
		const number = Math.round(progressPercentage);
		switch (true) {
			case number >= 75:
				return 'bg-great-custom';
			case number >= 50:
				return 'bg-average-custom';
			case number >= 0:
				return 'bg-bad-custom';
			default:
				return 'bg-gray-custom';
		}
	};

	const { data } = useQuery({
		queryKey: ['jobMatchReason', job?._id],
		queryFn: () => fetchJobMatchReason(job?._id),
		staleTime: 300000,
		enabled: !!job?._id,
	});

	return (
		<>
			<div
				className="w-full py-4 px-3 md:max-w-[715px] h-auto md:gap-[24px]  bg-white flex flex-col"
				style={{
					border: '1px solid #E6E6E6',
					borderRadius: '8px',
					backgroundColor: '#FFFFFF',
				}}
			>
				<div className="gap-4 flex flex-col">
					<div className="flex flex-col gap-4 md:flex-row md:justify-between items-start">
						<JobsTitles
							companyName={JobDetails?.company?.name}
							logo={JobDetails?.companyInfo?.logo}
							designationName={JobDetails?.designation?.name}
							rating={JobDetails?.companyInfo?.rating}
							postedAt={
								JobDetails?.postedAt &&
								moment(job?.postedAt).startOf('min').fromNow()
							}
							job={job}
							reviewsCount={JobDetails?.companyInfo?.reviewsCount}
							showRatingReview={showRatingReview}
						/>

						<div className="hidden md:flex min-w-[102px]">
							<ShareIcons
								jobId={job?._id}
								isSaved={job?.isSaved}
								jobNumber={job?.number?.toString().padStart(8, '0')}
								applyUrl={job?.applyUrls?.jobUrl}
							/>
						</div>

						<div className="block md:hidden w-full">
							<JobDetailsProgress
								matchScore={JobDetails?.matchScore}
								matchReason={data?.matchReason}
								tags={JobDetails?.tags?.match}
							/>
						</div>
					</div>

					<div className="flex w-full justify-between md:max-w-[683px] md:w-full h-auto flex-col ">
						<div className="flex justify-between  min-h-[154px]">
							{/* {/ left section /} */}
							{isOpenCard ? (
								<JobMatchCard
									className={`jobmatch-details ${getCardBackgroundColor(JobDetails?.matchScore?.totalPercentage)}`}
									{...JobDetails?.matchScore}
									matchReason={data?.matchReason}
								/>
							) : (
								<div className="flex flex-col gap-4 w-full md:w-9/12 md:py-[3px]  pt-4">
									<JobDescription
										location={JobDetails?.location?.city}
										experience={`${JobDetails?.experience?.range?.from} - ${JobDetails?.experience?.range?.to}`}
										salary={JobDetails?.salary?.description}
										jobType={JobDetails?.jobType?.join('/ ')}
										workModel={JobDetails?.workModel}
										// job={job}
										jobdetailview={jobdetailview}
									/>

									{/* {/ Chips Section /} */}
									<div className="flex md:gap-2 gap-1 items-center flex-wrap">
										{JobDetails?.tags?.job?.length
											? JobDetails?.tags?.job
													.slice(0, 4)
													.map((chip, i) => (
														<Chips
															key={chip}
															name={chip}
															num={i}
															color={chip}
															value={chip}
															className="text-[11px] font-medium py-1 px-2 rounded tracking-tight"
														/>
													))
											: null}
									</div>
									<div className="md:mb-0 md:pb-[3px]">
										<JobPostDetails
											opening={JobDetails?.companyInfo?.openings || 0}
											applicants={JobDetails?.applicants || 0}
											postedAt={JobDetails?.postedAt}
											postedBy={JobDetails?.postedBy}
										/>
									</div>
									<div className="block md:hidden ">
										<ShareIcons
											className="text-xl"
											jobId={job?._id}
											isSaved={job?.isSaved}
											applyUrl={job?.applyUrls?.jobUrl}
										/>
									</div>
								</div>
							)}

							{/* {/ right section  /} */}
							<div className="hidden md:max-w-[143px] md:w-full h-full md:block">
								<JobDetailsProgress
									matchScore={JobDetails?.matchScore}
									setOpenCard={setOpenCard}
									tags={JobDetails?.tags?.match}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(JobsDetails);
